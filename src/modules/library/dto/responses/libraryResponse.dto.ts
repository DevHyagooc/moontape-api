import { ApiProperty } from '@nestjs/swagger';
import { LibrarySummaryResponseDto } from './librarySummaryResponse.dto';
import { WatchlistItemResponseDto } from 'src/modules/watchlist/dto/responses/watchlistItemResponse.dto';
import { FavoriteItemResponseDto } from 'src/modules/favorites/dto/responses/favoriteItemResponse.dto';
import { ViewingItemResponseDto } from 'src/modules/viewings/dto/responses/viewingItemResponse.dto';

export class LibraryResponseDto {
  @ApiProperty({ type: LibrarySummaryResponseDto })
  summary: LibrarySummaryResponseDto;

  @ApiProperty({ type: [WatchlistItemResponseDto] })
  recentWatchlist: WatchlistItemResponseDto[];

  @ApiProperty({ type: [FavoriteItemResponseDto] })
  recentFavorites: FavoriteItemResponseDto[];

  @ApiProperty({ type: [ViewingItemResponseDto] })
  recentViewings: ViewingItemResponseDto[];
}