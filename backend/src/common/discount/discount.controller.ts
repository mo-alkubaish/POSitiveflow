import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ListAllDto } from 'src/dto/list-all.dto';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';

@ApiTags('Discounts')
@ApiBearerAuth()
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new discount' })
  @ApiBody({ type: CreateDiscountDto })
  @ApiResponse({ status: 201, description: 'Discount created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  /**
   * Creates a new discount
   * @param createDiscountDto The discount data
   * @returns The created discount
   */
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return await this.discountService.create(createDiscountDto);
  }

  @Get('active')
  @Roles(Role.Admin, Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all active discounts' })
  @ApiResponse({ status: 200, description: 'List of active discounts' })
  /**
   * Retrieves all currently active discounts
   * @returns List of active discounts
   */
  async findActiveDiscounts() {
    return await this.discountService.findActiveDiscounts();
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all discounts' })
  @ApiResponse({ status: 200, description: 'List of all discounts' })
  /**
   * Retrieves all discounts with pagination
   * @param listAllDto Pagination and search parameters
   * @returns Paginated list of discounts
   */
  async findAll(@Query() listAllDto: ListAllDto) {
    return await this.discountService.findAll(listAllDto.limit, listAllDto.page, listAllDto.search);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get discount by ID' })
  @ApiParam({ name: 'id', description: 'Discount ID' })
  @ApiResponse({ status: 200, description: 'Discount found' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  /**
   * Finds a discount by its ID
   * @param id The discount ID
   * @returns The found discount
   */
  async findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update discount' })
  @ApiParam({ name: 'id', description: 'Discount ID' })
  @ApiBody({ type: UpdateDiscountDto })
  @ApiResponse({ status: 200, description: 'Discount updated' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  /**
   * Updates an existing discount
   * @param id The discount ID
   * @param updateDiscountDto The updated discount data
   * @returns The updated discount
   */
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete discount' })
  @ApiParam({ name: 'id', description: 'Discount ID' })
  @ApiResponse({ status: 200, description: 'Discount deleted' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  /**
   * Removes a discount
   * @param id The discount ID
   * @returns Success message
   */
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
