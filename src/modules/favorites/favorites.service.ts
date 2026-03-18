import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddFavoriteDto } from "./dto/addFavoriteItem.dto";
import { TitleMapper } from '../../common/mappers/title.mapper';

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

  async getFavorites(userId: number) {
    const favorites = await this.prisma.favoriteTitle.findMany({
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

    return { data: favorites.map((item) => this.mapFavoriteItem(item)) }
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