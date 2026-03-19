import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, Max, Min} from 'class-validator';

export class UpdateViewingDto {
  @ApiPropertyOptional({ example: '2026-03-17T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  viewedAt?: string;

  @ApiPropertyOptional({ example: 4.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 'Gostei bastante da obra.', nullable: true })
  @IsOptional()
  @IsString()
  review?: string;
}