import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
   @ApiPropertyOptional({ example: 'Sophie Ternus' })
   @IsOptional()
   @IsString()
   name?: string;

   @ApiPropertyOptional({ example: 'https://site.com/avatar.png' })
   @IsOptional()
   @IsString()
   avatarUrl?: string;
}