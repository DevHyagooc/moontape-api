import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from './paginationMeta.dto';
import { TitleResponseDto } from './titleResponse.dto';

export class PaginatedTitlesResponseDto {
  @ApiProperty({
    type: [TitleResponseDto],
  })
  data: TitleResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}