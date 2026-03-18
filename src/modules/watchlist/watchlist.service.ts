import {  ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddWatchlistItemDto } from './dto/addWatchlistItem.dto';

@Injectable()
export class WatchlistService {
   constructor(private readonly prisma: PrismaService) {}

   private mapWatchlistItem(item: any) {
    return {
      id: item.id,
      userId: item.userId,
      titleId: item.titleId,
      createdAt: item.createdAt,
      title: {
        id: item.title.id,
        title: item.title.title,
        originalTitle: item.title.originalTitle,
        type: item.title.type,
        description: item.title.description,
        releaseDate: item.title.releaseDate,
        runtime: item.title.runtime,
        posterUrl: item.title.posterUrl,
        backdropUrl: item.title.backdropUrl,
        source: item.title.source,
        externalId: item.title.externalId,
        createdAt: item.title.createdAt,
        updatedAt: item.title.updatedAt,
        genres: item.title.titleGenres.map((tg: any) => tg.genre),
      },
    };
  }
   
   async addToWatchlist(userId: number, dto: AddWatchlistItemDto) {
      const title = await this.prisma.title.findUnique({
         where: { id: dto.titleId }
      })

      if (!title) {
         throw new NotFoundException('Title not found')
      }

      const existingWatchlistItem = await this.prisma.watchlistItem.findUnique({
         where: {
            userId_titleId: {
               userId,
               titleId: dto.titleId
            }
         }
      })

      if (existingWatchlistItem) {
         throw new ConflictException('Title already exists in watchlist')
      }

      const item = await this.prisma.watchlistItem.create({
         data: {
            userId,
            titleId: dto.titleId
         },
         include: {
            title: {
               include: {
                  titleGenres: {
                     include: {
                        genre: true
                     }
                  }
               }
            }
         }
      })

      return this.mapWatchlistItem(item)
   }

   async getWatchlist(userId: number) {
      const watchlist = await this.prisma.watchlistItem.findMany({
         where: { userId }, 
         orderBy: {
            createdAt: 'desc'
         },
         include: {
            title: {
               include: {
                  titleGenres: {
                     include: {
                        genre: true
                     }
                  }
               }
            }
         }
      })

      return {
         data: watchlist.map((item) => this.mapWatchlistItem(item))
      }
   }

   async removeToWatchlist(userId: number, titleId: number) {
      const watchlistItem = await this.prisma.watchlistItem.findUnique({
         where: {
            userId_titleId: {
               userId,
               titleId,
            }
         }
      })

      if (!watchlistItem) {
         throw new NotFoundException('Watchlist item not found')
      }

      await this.prisma.watchlistItem.delete({
         where: {
            userId_titleId: {
               userId,
               titleId
            }
         }
      })

      return {
         message: 'Title removed from watchlist successfuly'
      }
   }
}