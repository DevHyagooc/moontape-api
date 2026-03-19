import { Injectable } from '@nestjs/common';
import { TitleMapper } from 'src/common/mappers/title.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LibraryService {
   constructor(private readonly prisma: PrismaService) {}

   private mapWatchlistItem(item: any) {
      return {
         id: item.id,
         userId: item.userId,
         titleId: item.titleId,
         createdAt: item.createdAt,
         title: TitleMapper.toResponse(item.title),
      };
   }

   private mapFavoriteItem(item: any) {
      return {
         id: item.id,
         userId: item.userId,
         titleId: item.titleId,
         createdAt: item.createdAt,
         title: TitleMapper.toResponse(item.title),
      };
   }

   private mapViewingItem(item: any) {
      return {
         id: item.id,
         userId: item.userId,
         titleId: item.titleId,
         viewedAt: item.viewedAt,
         rating: Number(item.rating),
         review: item.review,
         createdAt: item.createdAt,
         updatedAt: item.updatedAt,
         title: TitleMapper.toResponse(item.title),
      };
   }

   async getLibrary(userId: number) {
      const [
         watchlistCount,
         favoritesCount,
         viewingsCount,
         recentWatchlist,
         recentFavorites,
         recentViewings
      ] = await Promise.all([
         this.prisma.watchlistItem.count({
            where: { userId }
         }),

         this.prisma.favoriteTitle.count({
            where: { userId }
         }),

         this.prisma.viewing.count({
            where: { userId }
         }),

         this.prisma.watchlistItem.findMany({
            where: { userId },
            orderBy: {
               createdAt: 'desc'
            },
            take: 5,
            include: {
               title: {
                  include: {
                     titleGenres: {
                        include: {
                           genre: true,
                        },
                     },
                  },
               },
            },
         }),

         this.prisma.favoriteTitle.findMany({
            where: { userId },
            orderBy: {
               createdAt: 'desc'
            },
            take: 5,
            include: {
               title: {
                  include: {
                     titleGenres: {
                        include: {
                           genre: true,
                        },
                     },
                  },
               },
            },
         }),

         this.prisma.viewing.findMany({
            where: { userId },
            orderBy: {
               createdAt: 'desc'
            },
            take: 5,
            include: {
               title: {
                  include: {
                     titleGenres: {
                        include: {
                           genre: true,
                        },
                     },
                  },
               },
            },
         }),
      ])

      return {
         summary: {
            watchlistCount,
            favoritesCount,
            viewingsCount
         },
         recentWatchlist: recentWatchlist.map((item) => 
            this.mapWatchlistItem(item)
         ),
         recentFavorites: recentFavorites.map((item) => 
            this.mapFavoriteItem(item)
         ),
         recentViewings: recentViewings.map((item) => 
            this.mapViewingItem(item)
         ),
      }
   }
}
