import { ApiProperty } from '@nestjs/swagger';
import { WatchlistItemResponseDto } from './watchlistItemResponse.dto copy';

export class WatchlistResponseDto {
  @ApiProperty({
    type: [WatchlistItemResponseDto],
  })
  data: WatchlistItemResponseDto[];
}