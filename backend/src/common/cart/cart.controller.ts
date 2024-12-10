import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Create new cart',
    description: 'Creates a new cart. User ID is extracted from JWT token.'
  })
  @ApiResponse({ status: 201, description: 'Cart created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
/**
 * Creates a new cart for the authenticated user.
 * 
 * @remarks
 * This method extracts the user ID from the JWT token in the request 
 * and uses it to create a new cart associated with the user.
 * 
 * @param request The incoming HTTP request containing the user's JWT token.
 * @returns A promise that resolves to the newly created cart.
 * 
 * @throws ConflictException if the user is not a cashier.
 */

  async create(@Req() request: Request) {
    const user = request['user'];
    return await this.cartService.create(user.id);
  }

  @Get(':id')
  @Roles(Role.Cashier, Role.Customer)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart found' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  /**
   * Finds a cart by its ID.
   * 
   * @param id The ID of the cart to be found.
   * @returns The cart with the given ID,
   * @throws NotFoundException if no cart with the given ID is found.
   */
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: UpdateCartDto, description: 'Data to update the cart, including customer ID and items' })
  @ApiResponse({ status: 200, description: 'Cart updated' })
  /**
   * Updates an existing cart.
   *
   * @param id The ID of the cart to be updated.
   * @param updateCartDto The data transfer object containing updated cart information.
   *                      It must include the following attributes:
   * - `customerId?`: the customer ID associated with the cart (optional)
   * - `items?`: array of CartItem objects (optional)
   * @returns The updated cart after changes have been persisted.
   * @throws NotFoundException if no cart with the given ID is found.
   */
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart deleted' })
/**
 * Removes a cart by its ID.
 *
 * @param id The ID of the cart to be removed.
 * @returns A message indicating the cart was removed successfully.
 * @throws NotFoundException if no cart with the given ID is found.
 */

  async remove(@Param('id') id: string) {
    return await this.cartService.remove(id);
  }

  @Get("drafts")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Get draft carts',
    description: 'Get all draft carts for the authenticated cashier. User ID from JWT token.'
  })
  @ApiResponse({ status: 200, description: 'List of draft carts' })
/**
 * Retrieves all draft carts for the authenticated cashier.
 * 
 * @param request - The HTTP request object, which contains the authenticated user information.
 * @returns A promise that resolves to a list of draft carts associated with the cashier.
 */

  async getDrafts(@Req() request: Request) {
    const user = request['user'];
    return await this.cartService.getDrafts(user.id);
  }

  @Get("pending")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Get pending carts',
    description: 'Get all pending carts for the authenticated cashier. User ID from JWT token.'
  })
  @ApiResponse({ status: 200, description: 'List of pending carts' })

/**
 * Retrieves all pending carts for the authenticated cashier.
 * 
 * @param request - The HTTP request object, which contains the authenticated user information.
 * @returns A promise that resolves to a list of pending carts associated with the cashier.
 */
  async getPending(@Req() request: Request) {
    const user = request['user'];
    return await this.cartService.getPending(user.id);
  }

  @Get("my-orders")
  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Get customer orders',
    description: 'Get all orders for the authenticated customer. User ID from JWT token.'
  })
  @ApiResponse({ status: 200, description: 'List of customer orders' })
/**
 * Retrieves all orders for the authenticated customer.
 * 
 * @param request - The HTTP request object, which contains the authenticated user information.
 * @returns A promise that resolves to a list of orders associated with the customer.
 */
  async getMyOrders(@Req() request: Request) {
    const user = request['user'];
    return await this.cartService.getMyOrders(user.id);
  }

  @Post(":id/checkout")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Checkout cart',
    description: 'Checkout a cart by changing its status to Paid.'
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart checked out' })

/**
 * Checks out a cart by changing its status to Paid.
 * 
 * @param id - The ID of the cart to be checked out.
 * @returns A message indicating the cart was checked out successfully.
 * @throws NotFoundException if no cart with the given ID is found.
 * @throws ConflictException if the cart is not in Draft status.
 * @throws ConflictException if the cart has no items.
 * @throws ConflictException if the cart has no customer.
 * @throws ConflictException if the cart has no cashier.
 */
  async checkout(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'];
    return await this.cartService.checkout(id, user.id);
  }

  @Post(":id/discount")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Add discount to cart',
    description: 'Add a discount to a cart by changing its status to Paid.'
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: 'Discount added to cart' })

  async addDiscount(@Param('id') cartId: string, @Body() discount: string) {
    return await this.cartService.applyDiscount(discount, cartId);
  }

  @Delete(":id/discount")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({ 
    summary: 'Remove discount from cart',
    description: 'Remove a discount from a cart by changing its status to Draft.'
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: 'Discount removed from cart' })

  async removeDiscount(@Param('id') cartId: string, @Body() discount: string) {
    return await this.cartService.removeDiscount(discount, cartId);
  }

  @Post(":id/loyalty-points")
  @Roles(Role.Cashier)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Apply loyalty points to cart',
    description: 'Apply loyalty points to a cart by changing its status to Paid.'
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: 'Loyalty points applied to cart' })

  async applyLoyaltyPoints(@Param('id') cartId: string, @Body() points: string) {
    if (!points) {
      throw new BadRequestException('Points must be provided'); 
    }
    if (isNaN(parseInt(points))) {
      throw new BadRequestException('Points must be a number');
    }
    return await this.cartService.applyLoyaltyPoints(cartId, parseInt(points));
    
  }

  @Get("summary")
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Get cart summary',
    description: 'Get a summary of all confirmed carts.'
  })
  @ApiResponse({ status: 200, description: 'Cart summary' })

  async getSummary() {
    return await this.cartService.getSummary();
  }
}