import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ListItemDto } from './dto/list-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.', type: Item })
  @ApiBody({ type: CreateItemDto })
  /**
   * Creates a new item in the database.
   *
   * @param createItemDto The item data to be saved in the database, it must contain the following properties:
   * - `name`: the name of the item
   * - `SKU`: the stock keeping unit of the item
   * - `price`: the price of the item
   * - `category`: the category of the item
   * - `stock`: the initial stock of the item
   * - `image`: the image of the item, it can be null
   * @returns The newly created item with its ID.
   */
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
    type: Item,
  })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(RolesGuard)
  @Get("low-stock")
  @ApiOperation({ summary: 'Find all items with low stock' })
  @ApiResponse({ status: 200, description: 'Return all items with low stock.', type: [Item] })
  /**
   * Finds all items with low stock.
   *
   * @returns An array of items with low stock.
   */
  async lowStock(@Query('limit') limit: number) {
    return this.itemsService.lowStock();
  }
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get("summery")
  @ApiOperation({ summary: 'Get a summary of stock levels' })
  @ApiResponse({ status: 200, description: 'Return a summary of stock levels.', type: Object })
/**
 * Retrieves a summary of stock levels including in-stock, low-stock, and out-of-stock items.
 *
 * @returns A promise that resolves to an object containing counts for in-stock, low-stock, and out-of-stock items.
 */
  async summery() {
    return this.itemsService.getSummery();
  }

  @Roles(Role.Manager, Role.Admin, Role.Cashier)
  @UseGuards(RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Find all items with pagination' })
  @ApiResponse({ status: 200, description: 'Return all items with pagination.', type: [Item] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term', example: 'example' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Category of the item', example: 'example' })
  /**
   * Finds all items with the given pagination options.
   *
   * @param listItemDto The pagination options, it must contain the following properties:
   * - `page`: the page number to be retrieved, the first page is 1
   * - `limit`: the number of items per page, the maximum is 100
   * - `search`: the search term to filter items
   * - 'category': the category of the item
   * @returns An object with two properties: `items` and `count`.
   * `items` is an array of items, and `count` is the total number of items in the database.
   */
  async findAll(@Query() listItemDto: ListItemDto) {
    return this.itemsService.findAll(listItemDto.page, listItemDto.limit, listItemDto.search, listItemDto.category);
}
  @Roles(Role.Manager, Role.Admin, Role.Cashier)
  @UseGuards(RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find an item by ID' })
  @ApiResponse({ status: 200, description: 'Return the item with the given ID.', type: Item })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item to be found' })
  /**
   * Finds an item by its ID.
   *
   * @param id The ID of the item to be found.
   * @returns The item with the given ID,
   * @throws NotFoundException if no item with the given ID is found.
   */
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.', type: Item })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item to be updated' })
  @ApiBody({ type: UpdateItemDto })
  /**
   * Updates an existing item in the database with new data.
   *
   * @param id The ID of the item to be updated.
   * @param updateItemDto The data transfer object containing updated item information. It must include the following attributes:
   * - `name?`: the name of the item (optional)
   * - `SKU?`: the stock keeping unit of the item (optional)
   * - `price?`: the price of the item (optional)
   * - `category?`: the category of the item (optional)
   * - `stock?`: the stock quantity of the item (optional)
   * - `image?`: the image of the item, it can be null (optional)
   * @returns The updated item after changes have been persisted.
   * @throws NotFoundException if no item with the given ID is found.
   */
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item to be deleted' })
  /**
   * Deletes an item from the database.
   *
   * @param id The ID of the item to be deleted.
   * @returns A string indicating that the item was removed.
   * @throws NotFoundException if no item with the given ID is found.
   */
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
