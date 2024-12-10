import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    const reflector = {} as Reflector;
    const jwtService = {} as JwtService;
    expect(new RolesGuard(reflector, jwtService)).toBeDefined();
  });
});
