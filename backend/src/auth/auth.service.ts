
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/mongodb';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

/**
 * Authenticates a user and returns an access token.
 * 
 * @param username - The username of the user attempting to sign in.
 * @param pass - The password of the user attempting to sign in.
 * @returns A promise that resolves to an object containing the access token.
 * 
 * @throws UnauthorizedException If the provided credentials are invalid.
 * 
 * This function checks the provided username and password against the stored 
 * credentials. If valid, it generates a JWT access token for the user.
 */
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!await this.usersService.comparePassword(user, pass)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
/**
 * Signs out a user by blacklisting the provided JWT token.
 * 
 * @param token The JWT token to be blacklisted.
 * @throws UnauthorizedException If the token is invalid.
 * 
 * This function decodes the JWT token to get its expiration time and creates
 * a blacklisted token entry in the database with the provided token and 
 * its expiration time. If the token is invalid, an UnauthorizedException is thrown.
 */
  async signOut(token: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const expiresAt = new Date(decoded.exp * 1000);

      const blacklistedToken = this.em.create('BlacklistedToken', {
        token,
        expiresAt
      });
      
      await this.em.persistAndFlush(blacklistedToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Validates a user payload from a JWT token.
   * @param payload The decoded payload from the JWT token.
   * @returns A promise that resolves to a user if the user exists in the database, or null if the user does not exist.
   */
  async validateUser(payload: any) {
    return this.usersService.findOne(payload.username);
  }


  /**
   * Checks if a given token is blacklisted.
   * @param token The token to be checked.
   * @returns A promise that resolves to a boolean indicating if the token is blacklisted.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.em.findOne('BlacklistedToken', { token });
    return !!blacklistedToken;
  }
  @Cron(CronExpression.EVERY_HOUR)  
  /**
   * Removes all expired blacklisted tokens from the database.
   * 
   * This function is run every hour via a cron job.
   * @returns A promise that resolves when all expired tokens have been removed.
   */
  removeExpiredTokens(): void {
    const now = new Date();
    this.em.nativeDelete('BlacklistedToken', { expiresAt: { $lt: now } });
  }
}
