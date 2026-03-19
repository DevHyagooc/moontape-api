import { ApiProperty } from '@nestjs/swagger';

export class LibrarySummaryResponseDto {
  @ApiProperty({ example: 60 })
  watchlistCount: number;

  @ApiProperty({ example: 20 })
  favoritesCount: number;

  @ApiProperty({ example: 200 })
  viewingsCount: number;
}