import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TitlesService } from './titles.service';
import { FindTitlesDto } from './dto/findTitles.dto';

@ApiTags('Titles')
@Controller('titles')
export class TitlesController {
   constructor(private readonly titlesService: TitlesService) {}

   @ApiOperation({ summary: 'List all titles' })
   @Get()
   findAll(@Query() query: FindTitlesDto) {
      return this.titlesService.findAll(query)
   }

   @ApiOperation({ summary: 'Get title by id' })
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.titlesService.findOne(id)
   }
}