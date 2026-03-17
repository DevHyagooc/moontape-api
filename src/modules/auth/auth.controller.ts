import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/responses/loginResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @ApiOperation({ summary: 'Login with credentials' })
   @ApiOkResponse({ type: LoginResponseDto })
   @Post('login')
   login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto.email, loginDto.password);
   }
}
