import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Hyago Oliveira' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'hyago@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'https://site.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}