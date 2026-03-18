import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FavoritesService } from "./favorites.service";
import { FavoritesResponseDto } from "./dto/responses/favoritesResponse.dto";
import { GetCurrentUser } from "src/common/decorators/getCurrentUserDecorator";
import { AddFavoriteDto } from "./dto/addFavoriteItem.dto";
import { FavoriteItemResponseDto } from "./dto/responses/favoriteItemResponse.dto";

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
   constructor(private readonly favoritesService: FavoritesService) {}

   @ApiOperation({ summary: 'Add title to favorites' })
   @ApiCreatedResponse({ type: FavoriteItemResponseDto})
   @Post()
   addToFavorite(
      @GetCurrentUser('userId') userId: number,
      @Body() dto: AddFavoriteDto
   ) {
      return this.favoritesService.addToFavorites(userId, dto)
   }

   @ApiOperation({ summary: 'List authenticated user favorites' })
   @ApiCreatedResponse({ type: FavoritesResponseDto })
   @Get()
   getFavorites(@GetCurrentUser('userId') userId: number) {
      return this.favoritesService.getFavorites(userId)
   }

   @ApiOperation({ summary: 'Remove title from favorites' })
   @ApiOkResponse({
      schema: {
         example: {
         message: 'Title removed from favorites successfully',
         },
      },
   })
   @Delete(':titleId')
   removeFromFavorite(
      @GetCurrentUser('userId') userId: number,
      @Param('titleId', ParseIntPipe) titleId: number
   ) {
      return this.favoritesService.removeFromFavorite(userId, titleId)
   }   
}