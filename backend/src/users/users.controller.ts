import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/role/roles.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from './enums/role.enum';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ListUsersDto } from './dto/list-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}
    @Post('')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @ApiBody({ type: CreateUserDto })
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'New user created' })
    @ApiResponse({ status: 409, description: 'The user already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Create a new user
     * @remarks
     * Signs up a new user.
     * @param signUpDto The sign up data, containing the phone, email, and password.
     */
    async create(@Body() newUser: CreateUserDto) {
      const { phone, email, password, role } = newUser;
      await this.userService.create(phone, email, password, role);
      return { message: 'Successfully created user.' };
    }
    
    @Get('')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Get all users
     * @remarks
     * Retrieves a list of all users.
     */
    async findAll(@Query() findAllDto: ListUsersDto) {

        return await this.userService.findAll(findAllDto.page, findAllDto.limit, findAllDto.search, findAllDto.isCustomers);
    }

    @Get('me')
    @Roles(Role.Customer)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Get current user' })
    @ApiResponse({ status: 200, description: 'The current user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Get current user
     * @remarks
     * Retrieves the current user.
     */
    async me( @Request() req) {
        return await this.userService.summery(req.user.id);
    }

    @Get(':id')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Get user by ID
     * @remarks
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     */
    async findOne(@Param('id') id: string) {
        return await this.userService.summery(id);
    }


    @Patch(':id')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Update a user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 200, description: 'User updated' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Update a user
     * @remarks
     * Updates a user by their ID.
     * @param id The ID of the user to update.
     * @param updateUserDto The update data for the user.
     */
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Delete a user
     * @remarks
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     */
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
    
    
}

