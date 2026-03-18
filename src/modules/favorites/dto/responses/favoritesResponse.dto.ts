import { ApiProperty } from '@nestjs/swagger';
import { FavoriteItemResponseDto } from './favoriteItemResponse.dto';

export class FavoritesResponseDto {
  @ApiProperty({ type: [FavoriteItemResponseDto] })
  data: FavoriteItemResponseDto[];
}