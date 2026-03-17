import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, isInt, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum TitleType {
   MOVIE = 'MOVIE',
   SERIES = 'SERIES',
   ANIME = 'ANIME'
}

export class FindTitlesDto {
   @ApiPropertyOptional({ example: 1 })
   @IsOptional()
   @Type(() => Number)
   @IsInt()
   @Min(1)
   page?: number = 1

   @ApiPropertyOptional({ example: 10 })
   @IsOptional()
   @Type(() => Number)
   @IsInt()
   @Min(1)
   limit?: number = 10

   @ApiPropertyOptional({ example: 'naruto' })
   @IsOptional()
   @IsString()
   name?: string

   @ApiPropertyOptional({ enum: TitleType })
   @IsOptional()
   @IsEnum(TitleType)
   type?: TitleType
}