import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddWatchlistItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the title to add to watchlist',
  })
  @IsInt()
  @Min(1)
  titleId: number;
}