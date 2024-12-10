import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ListAllDto } from '../dto/list-all.dto';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';

@ApiTags('Suppliers')
@ApiBearerAuth()
@Controller('suppliers')
/**
 * Controller for managing suppliers
 * Requires Manager role for all operations
 */
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  /**
   * Creates a new supplier
   * @param createSupplierDto - The supplier data
   */
  @Post()
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({ status: 201, description: 'Supplier created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Managers only' })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  /**
   * Retrieves all suppliers with pagination
   * @param listAllDto - Pagination and search parameters
   */
  @Get()
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiResponse({ status: 200, description: 'List of suppliers' })
  @ApiResponse({ status: 403, description: 'Forbidden - Managers only' })
  findAll(@Query() listAllDto: ListAllDto) {
    return this.suppliersService.findAll(listAllDto.page, listAllDto.limit, listAllDto.search);
  }

  /**
   * Retrieves a specific supplier by ID
   * @param id - Supplier ID
   */
  @Get(':id')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get supplier by ID' })
  @ApiParam({ name: 'id', description: 'Supplier ID' })
  @ApiResponse({ status: 200, description: 'Supplier found' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  /**
   * Updates a supplier
   * @param id - Supplier ID
   * @param updateSupplierDto - Updated supplier data
   */
  @Patch(':id')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update supplier' })
  @ApiParam({ name: 'id', description: 'Supplier ID' })
  @ApiBody({ type: UpdateSupplierDto })
  @ApiResponse({ status: 200, description: 'Supplier updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  /**
   * Deletes a supplier
   * @param id - Supplier ID
   */
  @Delete(':id')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete supplier' })
  @ApiParam({ name: 'id', description: 'Supplier ID' })
  @ApiResponse({ status: 200, description: 'Supplier deleted successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}