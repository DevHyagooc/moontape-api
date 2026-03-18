import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WatchlistService } from "./watchlist.service";
import { WatchlistItemResponseDto } from "./dto/responses/watchlistItemResponse.dto copy";
import { GetCurrentUser } from "src/common/decorators/getCurrentUserDecorator";
import { AddWatchlistItemDto } from "./dto/addWatchlistItem.dto";
import { WatchlistResponseDto } from "./dto/responses/watchlistResponse.dto";

@ApiTags('Watchlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('watchlist')
export class WatchlistController {
   constructor(private readonly watchlistService: WatchlistService) {}

   @ApiOperation({ summary: 'Add title to watchlist' })
   @ApiCreatedResponse({ type: WatchlistItemResponseDto })
   @Post()
   addToWatchlist(
      @GetCurrentUser('userId') userId: number,
      @Body() dto: AddWatchlistItemDto,
   ){
      return this.watchlistService.addToWatchlist(userId, dto)
   }

   @ApiOperation({ summary: 'List authenticated user watchlist' })
   @ApiOkResponse({ type: WatchlistResponseDto })
   @Get()
   getWatchlist(
      @GetCurrentUser('userId') userId: number
   ){
      return this.watchlistService.getWatchlist(userId)
   }

   @ApiOperation({ summary: 'Remove title from watchlist' })
   @ApiOkResponse({ 
      schema: {
         example: {
            message: 'Title removed from watchlist successfuly'
         }
      }
   })
   @Delete(':titleId')
   removeToWatchlist(
      @GetCurrentUser('userId') userId: number,
      @Param('titleId', ParseIntPipe) titleId: number
   ){
      return this.watchlistService.removeToWatchlist(userId, titleId)
   }

}