import {  ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddWatchlistItemDto } from './dto/addWatchlistItem.dto';
import { TitleMapper } from '../../common/mappers/title.mapper';
import { FindWatchlistsDto } from './dto/findWatchlists.dto';
import { contains } from 'class-validator';

@Injectable()
export class WatchlistService {
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

   async getWatchlist(userId: number, params: FindWatchlistsDto) {
      const { page = 1, limit= 10, name, type} = params

      const skip = (page - 1) * limit

      const where = {
         userId,
         ...(type || name
            ? {
               title: {
                  ...(type && { type }),
                  ...(name && {
                     OR: [
                        {
                           title: {
                              contains: name,
                           },
                        },
                        {
                           originalTitle: {
                              contains: name,
                           },
                        },
                     ],
                  }),
               },
            } 
         : {}),
      }

      const [watchlist, total] = await Promise.all([
         this.prisma.watchlistItem.findMany({
            where,
            skip,
            take: limit, 
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
         }),
         this.prisma.watchlistItem.count({
            where
         })
      ])

      return {
         data: watchlist.map((item) => this.mapWatchlistItem(item)),
         meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
         }
      }
   }

   async removeFromWatchlist(userId: number, titleId: number) {
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