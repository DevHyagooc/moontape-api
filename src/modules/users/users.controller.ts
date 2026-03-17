import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/getCurrentUserDecorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetCurrentUser('userId') userId: number) {
    return this.usersService.getMe(userId)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update authenticated user profile' })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @GetCurrentUser('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateMe(userId, updateUserDto)
  }
}