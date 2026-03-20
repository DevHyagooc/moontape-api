import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TitleType } from 'src/common/enums/titleType.enum';

export class FindWatchlistsDto {
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