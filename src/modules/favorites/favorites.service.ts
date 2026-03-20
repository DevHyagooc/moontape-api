import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddFavoriteDto } from "./dto/addFavoriteItem.dto";
import { TitleMapper } from '../../common/mappers/title.mapper';
import { FindFavoritesDto } from "./dto/findFavorites.dto";

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  private mapFavoriteItem(item: any) {
    return {
      id: item.id,
      userId: item.userId,
      titleId: item.titleId,
      createdAt: item.createdAt,
      title: TitleMapper.toResponse(item.title),
    };  
  }

  async addToFavorites(userId: number, dto: AddFavoriteDto) {
    const title = await this.prisma.title.findUnique({
      where: { id: dto.titleId }
    })

    if (!title) {
      throw new NotFoundException('Title not found')
    }

    const existingFavorite = await this.prisma.favoriteTitle.findUnique({
      where: {
        userId_titleId: {
          userId,
          titleId: dto.titleId
        }
      }
    })

    if (existingFavorite) {
      throw new ConflictException('Title already exists in favorites')
    }

    const item = await this.prisma.favoriteTitle.create({
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

    return this.mapFavoriteItem(item)
  }

  async getFavorites(userId: number, params: FindFavoritesDto) {
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
    
    const [favorites, total] = await Promise.all([
      this.prisma.favoriteTitle.findMany({
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
      this.prisma.favoriteTitle.count({
        where
      })
    ])

    return { 
      data: favorites.map((item) => this.mapFavoriteItem(item)),
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit)
      }
    }
  }

  async removeFromFavorite(userId: number, titleId: number) {
    const favoriteItem = await this.prisma.favoriteTitle.findUnique({
      where: { 
        userId_titleId: {
          userId,
          titleId
        }
      }
    })

    if (!favoriteItem) {
      throw new NotFoundException('Favorite item not found')
    }

    await this.prisma.favoriteTitle.delete({
      where: {
        userId_titleId: {
          userId,
          titleId
        }
      }
    })

    return { message: 'Title removed from favorites successfuly' }
  }
}