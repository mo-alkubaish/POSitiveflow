import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { ListAllDto } from 'src/dto/list-all.dto';

@ApiTags('Feedback')
@ApiBearerAuth()
@Controller('feedback')
/**
 * Controller handling all feedback-related operations
 */
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * Creates a new feedback for a specific order
   * @param createFeedbackDto - The feedback data
   * @param cartId - The ID of the order
   * @param req - The request object containing user information
   */
  @Post(":id")
  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({ status: 201, description: 'Feedback created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createFeedbackDto: CreateFeedbackDto, @Param('id') cartId: string, @Request() req) {
    const userId = req['user'].id;
    return await this.feedbackService.create(createFeedbackDto, cartId, userId);
  }

  /**
   * Retrieves all feedbacks (Admin only)
   * @param listAllDto - Pagination parameters
   */
  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiResponse({ status: 200, description: 'List of all feedbacks' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  async findAll(@Query() listAllDto: ListAllDto ) {
    return await this.feedbackService.findAll(listAllDto);
  }

  /**
   * Retrieves a specific feedback
   * @param id - Feedback ID
   * @param req - Request object containing user information
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiResponse({ status: 200, description: 'Feedback found' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req['user'].id;
    return await this.feedbackService.findOne(id, userId);
  }

  /**
   * Updates an existing feedback
   * @param id - Feedback ID
   * @param updateFeedbackDto - Updated feedback data
   * @param req - Request object containing user information
   */
  @Patch(':id')
  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update a feedback' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiBody({ type: UpdateFeedbackDto })
  @ApiResponse({ status: 200, description: 'Feedback updated successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto, @Request() req) {
    const userId = req['user'].id;
    return await this.feedbackService.update(id, updateFeedbackDto, userId);
  }

  /**
   * Deletes a feedback
   * @param id - Feedback ID
   * @param req - Request object containing user information
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feedback' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req['user'].id;
    return await this.feedbackService.remove(id, userId);
  }
}