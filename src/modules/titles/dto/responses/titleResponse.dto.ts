import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenreResponseDto } from './genreResponse.dto';

export class TitleResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Naruto' })
  title: string;

  @ApiPropertyOptional({ example: 'ナルト', nullable: true })
  originalTitle?: string | null;

  @ApiProperty({ example: 'SERIES' })
  type: string;

  @ApiPropertyOptional({
    example: 'A story about a young ninja...',
    nullable: true,
  })
  description?: string | null;

  @ApiPropertyOptional({
    example: '2002-10-03T00:00:00.000Z',
    nullable: true,
  })
  releaseDate?: Date | null;

  @ApiPropertyOptional({ example: 24, nullable: true })
  runtime?: number | null;

  @ApiPropertyOptional({
    example: 'https://image.tmdb.org/t/p/w500/poster.jpg',
    nullable: true,
  })
  posterUrl?: string | null;

  @ApiPropertyOptional({
    example: 'https://image.tmdb.org/t/p/original/backdrop.jpg',
    nullable: true,
  })
  backdropUrl?: string | null;

  @ApiPropertyOptional({ example: 'TMDB', nullable: true })
  source?: string | null;

  @ApiPropertyOptional({ example: '12345', nullable: true })
  externalId?: string | null;

  @ApiProperty({
    type: [GenreResponseDto],
  })
  genres: GenreResponseDto[];

  @ApiProperty({
    example: '2026-03-17T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-03-17T12:00:00.000Z',
  })
  updatedAt: Date;
}