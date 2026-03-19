import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TitlesService } from './titles.service';
import { FindTitlesDto } from './dto/findTitles.dto';
import { PaginatedTitlesResponseDto } from './dto/responses/paginatedTitlesResponse.dto';
import { TitleResponseDto } from './dto/responses/titleResponse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TitleDetailsResponseDto } from './dto/responses/titleDetailsResponse.dto';
import { GetCurrentUser } from 'src/common/decorators/getCurrentUserDecorator';

@ApiTags('Titles')
@Controller('titles')
export class TitlesController {
   constructor(private readonly titlesService: TitlesService) {}

   @ApiOperation({ summary: 'List all titles' })
   @ApiOkResponse({ type: PaginatedTitlesResponseDto })
   @Get()
   findAll(@Query() query: FindTitlesDto) {
      return this.titlesService.findAll(query)
   }

   @ApiOperation({ summary: 'Get title by id' })
   @ApiOkResponse({ type: TitleResponseDto })
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.titlesService.findOne(id)
   }

   @ApiOperation({ summary: 'Get title details with authenticated user context' })
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   @ApiOkResponse({ type: TitleDetailsResponseDto })
   @Get(':id/details')
   findOneWithUserContext(
      @Param('id', ParseIntPipe) id: number,
      @GetCurrentUser('userId') userId: number,
   ) {
      return this.titlesService.findOneWithUserContext(id, userId);
   }
}