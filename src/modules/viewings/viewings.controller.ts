import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ViewingsService } from "./viewings.service";
import { ViewingsResponseDto } from "./dto/responses/viewingsResponse.dto";
import { ViewingItemResponseDto } from "./dto/responses/viewingItemResponse.dto";
import { GetCurrentUser } from "src/common/decorators/getCurrentUserDecorator";
import { CreateViewingDto } from "./dto/createViewing.dto";
import { UpdateViewingDto } from "./dto/updateViewing.dto";
import { FindViewingsDto } from "./dto/findViewings.dto";

@ApiTags('Viewings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('viewings')
export class ViewingsController {
  constructor(private readonly viewingsService: ViewingsService) {}

  @ApiOperation({ summary: 'Add title viewing' })
  @ApiCreatedResponse({ type: ViewingItemResponseDto })
  @Post()
  addViewing(
    @GetCurrentUser('userId') userId: number,
    @Body() dto: CreateViewingDto
  ){
    return this.viewingsService.addViewing(userId, dto)
  }

  @ApiOperation({ summary: 'List authenticated user viewings' })
  @ApiOkResponse({ type: ViewingsResponseDto })
  @Get()
  getViewings(
    @GetCurrentUser('userId') userId: number,
    @Query() params: FindViewingsDto
  ){
    return this.viewingsService.getViewings(userId, params)
  }

  @ApiOperation({ summary: 'Get authenticated user viewing by id' })
  @ApiOkResponse({ type: ViewingItemResponseDto })
  @Get(':id')
  getViewingById(
    @GetCurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number 
  ){
    return this.viewingsService.getViewingById(userId, id)
  }

  @ApiOperation({ summary: 'Update authenticated user viewing' })
  @ApiOkResponse({ type: ViewingItemResponseDto })
  @Patch(':id')
  updateViewing(
    @GetCurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateViewingDto
  ){
    return this.viewingsService.updateViewing(userId, id, dto)
  }

  @ApiOperation({ summary: 'Remove authenticated user viewing' })
  @ApiOkResponse({ 
    schema: {
      example: {
        message: 'Viewing removed successfuly'
      }
    }
   })
  @Delete(':id')
  removeViewing(
    @GetCurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.viewingsService.removeViewing(userId, id)
  }
}