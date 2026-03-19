import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TitleResponseDto } from 'src/modules/titles/dto/responses/titleResponse.dto';

export class ViewingItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 10 })
  titleId: number;

  @ApiProperty({ example: '2026-03-17T12:00:00.000Z' })
  viewedAt: Date;

  @ApiProperty({ example: 4.5 })
  rating: number;

  @ApiPropertyOptional({ example: 'Gostei bastante da obra.', nullable: true })
  review?: string | null;

  @ApiProperty({ example: '2026-03-17T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-17T12:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ type: TitleResponseDto })
  title: TitleResponseDto;
}