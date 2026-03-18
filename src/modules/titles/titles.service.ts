import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FindTitlesDto } from './dto/findTitles.dto';
import { TitleMapper } from '../../common/mappers/title.mapper';

@Injectable()
export class TitlesService {
   constructor(private readonly prisma: PrismaService) {}

   async findAll(params: FindTitlesDto) {
      const { page = 1, limit = 10, name, type } = params

      const skip = (page - 1) * limit

      const where = {
         ...(type && { type }),
            ...(name && {
               OR: [
                  {
                     title: {
                        contains: name
                     }
                  },
                  {
                     originalTitle: {
                        contains: name
                     }
                  }
               ]
            })
      }

      const [titles, total] = await Promise.all([
         this.prisma.title.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
               createdAt: 'desc'
            },
            include: {
               titleGenres: {
                  include: {
                     genre: true
                  }
               }
            }
         }),
         this.prisma.title.count({
            where
         })
      ])

      return {
         data: titles.map((title) => TitleMapper.toResponse(title)),
         meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
         }
      }
   }

   async findOne(id: number) {
      const title = await this.prisma.title.findUnique({
         where: { id },
         include: {
            titleGenres: {
               include: {
                  genre: true
               }
            }
         }
      })

      if(!title) {
         throw new NotFoundException('Title not found')
      }

      return TitleMapper.toResponse(title)
   }
}