import { ApiProperty } from '@nestjs/swagger';
import { WatchlistItemResponseDto } from './watchlistItemResponse.dto';

export class WatchlistResponseDto {
  @ApiProperty({
    type: [WatchlistItemResponseDto],
  })
  data: WatchlistItemResponseDto[];
}