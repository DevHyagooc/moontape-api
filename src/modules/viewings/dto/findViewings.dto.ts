import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { TitleType } from 'src/common/enums/titleType.enum';

export class FindViewingsDto {
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

   @ApiPropertyOptional({ example: 4.5 })
   @IsOptional()
   @IsNumber({ maxDecimalPlaces: 1 })
   @Min(0)
   @Max(5)
   rating?: number

   @ApiPropertyOptional({ example: '2025-03-17T12:00:00.000Z' })
   @IsOptional()
   @Type(() => Date)
   @IsDate()
   viewedAtFrom?: Date

   @ApiPropertyOptional({ example: '2026-03-17T12:00:00.000Z' })
   @IsOptional()
   @Type(() => Date)
   @IsDate()
   viewedAtTo?: Date
}