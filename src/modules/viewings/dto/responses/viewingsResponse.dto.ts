import { ApiProperty } from '@nestjs/swagger';
import { ViewingItemResponseDto } from './viewingItemResponse.dto';

export class ViewingsResponseDto {
  @ApiProperty({ type: [ViewingItemResponseDto] })
  data: ViewingItemResponseDto[];
}