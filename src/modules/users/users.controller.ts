import { Body, Controller, Post, Get, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/getCurrentUserDecorator';
import { UserResponseDto } from './dto/responses/userResponse.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: UserResponseDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetCurrentUser('userId') userId: number) {
    return this.usersService.getMe(userId)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update authenticated user profile' })
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @GetCurrentUser('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateMe(userId, updateUserDto)
  }
}