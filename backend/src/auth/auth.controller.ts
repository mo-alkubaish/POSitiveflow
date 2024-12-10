import { Controller, Post, Body,  Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: SignInDto })
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'Successfully signed in.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  /**
   * Sign in
   * @remarks
   * Signs in a user, given valid credentials.
   * @param signInDto The sign in data, containing the email or phone and password.
   * @returns An access token, which can be used to authenticate further requests.
   */
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto.email || signInDto.phone, signInDto.password);
    return token;
  }
  @Post('logout')
  @ApiOperation({ summary: 'Sign out' })
  @ApiResponse({ status: 200, description: 'Successfully signed out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
    /**
     * Sign out
     * @remarks
     * Signs out the authenticated user.
     */
    async signOut(@Request() req) {
        await this.authService.signOut(req.user);
        return { message: 'Successfully signed out.' };
    }
}
