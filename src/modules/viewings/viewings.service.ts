import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TitleMapper } from "src/common/mappers/title.mapper";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateViewingDto } from "./dto/createViewing.dto";
import { UpdateViewingDto } from "./dto/updateViewing.dto";
import { FindViewingsDto } from "./dto/findViewings.dto";

@Injectable()
export class ViewingsService {
   constructor(private readonly prisma: PrismaService) {}

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

   async addViewing(userId: number, dto: CreateViewingDto){
      const title = await this.prisma.title.findUnique({
         where: { id: dto.titleId }
      })

      if (!title) {
         throw new NotFoundException('Title not found')
      }

      if (!Number.isInteger(dto.rating * 2)) {
         throw new BadRequestException('Rating must be between 0 and 5 in increments of 0.5')
      }

      const viewing = await this.prisma.viewing.create({
         data: {
            userId,
            titleId: dto.titleId,
            viewedAt: new Date(dto.viewedAt),
            rating: dto.rating,
            review: dto.review
         },
         include: {
            title: {
               include: {
                  titleGenres: {
                     include: {
                        genre: true,
                     },
                  },
               },
            }
         }
      })

      await this.prisma.watchlistItem.deleteMany({
         where: {
            userId,
            titleId: dto.titleId
         }
      })

      return this.mapViewingItem(viewing)
   }

   async getViewings(userId: number, params: FindViewingsDto){
      const { page = 1, limit= 10, name, type, rating, viewedAtFrom, viewedAtTo} = params

      const skip = (page - 1) * limit

      const where = {
         userId,
         ...(rating !== undefined && { rating }),
         ...((viewedAtFrom || viewedAtTo) && {
            viewedAt: {
               ...(viewedAtFrom && { gte: viewedAtFrom }),
               ...(viewedAtTo && { lte: viewedAtTo }),
            },
         }),
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
      };

      const [viewings, total] = await Promise.all([
         this.prisma.viewing.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
            viewedAt: 'desc',
            },
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
         this.prisma.viewing.count({
            where,
         }),
      ]);

      return {
         data: viewings.map((item) => this.mapViewingItem(item)),
         meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
         },
      };
      }

   async getViewingById(userId: number, id: number){
      const viewing = await this.prisma.viewing.findFirst({
         where: {
            id,
            userId
         },
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
         }
      })

      if (!viewing) {
         throw new NotFoundException('Viewing not found')
      }

      return this.mapViewingItem(viewing)
   }

   async updateViewing(userId: number, id: number, dto: UpdateViewingDto){
      const existingViewing = await this.prisma.viewing.findFirst({
         where: {
            id,
            userId
         }
      })

      if (!existingViewing) {
         throw new NotFoundException('Viewing not found')
      }

      if (
         dto.rating !== undefined &&
         !Number.isInteger(dto.rating * 2)
      ) {
         throw new BadRequestException('Rating must be between 0 and 5 in increments of 0.5')
      }

      const updatedViewing = await this.prisma.viewing.update({
         where: { id },
         data: {
            viewedAt: dto.viewedAt ? new Date(dto.viewedAt) : undefined,
            rating: dto.rating !== undefined ? dto.rating : undefined,
            review: dto.review,
         },
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
      });

      return this.mapViewingItem(updatedViewing);
   }

   async removeViewing(userId: number, id: number) {
    const existingViewing = await this.prisma.viewing.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingViewing) {
      throw new NotFoundException('Viewing not found');
    }

    await this.prisma.viewing.delete({
      where: { id },
    });

    return {
      message: 'Viewing removed successfully',
    };
  }
}