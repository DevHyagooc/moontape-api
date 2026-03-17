import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
   ) {}

   async validateUser(email: string, password: string) {
      const user = await this.usersService.findByEmail(email)

      if (!user) {
         throw new UnauthorizedException('Invalid credentials')
      }

      const passwordMatches = await bcrypt.compare(password, user.passwordHash)

      if (!passwordMatches) {
         throw new UnauthorizedException('Invalid credentials')
      }

      return user
   }

   async login(email: string, password: string) {
      const user = await this.validateUser(email, password)

      const payload = {
         sub: user.id,
         email: user.email
      }

      return {
         access_token: await this.jwtService.signAsync(payload)
      }
   }
}
