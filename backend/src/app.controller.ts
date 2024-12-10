import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'ensure the server is running' })
  getHello(): string {
    return this.appService.getHello();
  }
  // @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'The profile of the authenticated user.', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  /**
   * Get profile
   * @remarks
   * Returns the profile of the authenticated user.
   * @returns The profile of the authenticated user.
   * @security bearerAuth
   * @produces application/json
   * @consumes application/json
   */
  getProfile(@Request() req) {
    return req.user;
  }
}
