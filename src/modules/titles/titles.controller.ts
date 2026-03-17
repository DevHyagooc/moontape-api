import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TitlesService } from './titles.service';
import { FindTitlesDto } from './dto/findTitles.dto';
import { PaginatedTitlesResponseDto } from './dto/responses/paginatedTitlesResponse.dto';
import { TitleResponseDto } from './dto/responses/titleResponse.dto';

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
}