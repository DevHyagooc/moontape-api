import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TitleUserContextResponseDto {
  @ApiProperty({ example: true })
  inWatchlist: boolean;

  @ApiProperty({ example: false })
  isFavorite: boolean;

  @ApiProperty({ example: true })
  hasViewed: boolean;

  @ApiProperty({ example: 2 })
  viewingsCount: number;

  @ApiPropertyOptional({
    example: '2026-03-18T10:00:00.000Z',
    nullable: true,
  })
  lastViewedAt?: Date | null;

  @ApiPropertyOptional({
    example: 4.5,
    nullable: true,
  })
  lastRating?: number | null;

  @ApiPropertyOptional({
    example: 'Gostei mais do que lembrava.',
    nullable: true,
  })
  lastReview?: string | null;
}