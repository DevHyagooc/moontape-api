import { ApiProperty } from '@nestjs/swagger';
import { TitleResponseDto } from './titleResponse.dto';
import { TitleUserContextResponseDto } from './titleUserContextResponse.dto';

export class TitleDetailsResponseDto extends TitleResponseDto {
  @ApiProperty({ type: TitleUserContextResponseDto })
  userContext: TitleUserContextResponseDto;
}