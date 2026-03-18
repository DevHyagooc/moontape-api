import { ApiProperty } from '@nestjs/swagger';
import { TitleResponseDto } from 'src/modules/titles/dto/responses/titleResponse.dto';

export class WatchlistItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 10 })
  titleId: number;

  @ApiProperty({
    example: '2026-03-17T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: TitleResponseDto,
  })
  title: TitleResponseDto;
}