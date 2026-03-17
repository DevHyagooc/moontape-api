import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService) {}

   async createUser(createUserDto: CreateUserDto) {
      const existingUser = await this.prisma.user.findUnique({
         where: { email: createUserDto.email }
      })

      if (existingUser) {
         throw new BadRequestException('Email already in use')
      }

      const passwordHash = await bcrypt.hash(createUserDto.password, 10)

      return this.prisma.user.create({
         data: {
            name: createUserDto.name,
            email: createUserDto.email,
            passwordHash,
            avatarUrl: createUserDto.avatarUrl,
         },
         select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            createdAt: true,
            updatedAt: true
         }
      })
   }

   async getMe(userId: number) {
      const user = await this.prisma.user.findUnique({
         where: { id: userId },
         select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            createdAt: true,
            updatedAt: true,
         }
      })

      if (!user) {
         throw new NotFoundException('User not found')
      }

      return user
   }

   async updateMe(userId: number, updateUserDto: UpdateUserDto) {
      const userExists = await this.prisma.user.findUnique({
         where: { id: userId }
      });

      if (!userExists) {
         throw new NotFoundException('User not found')
      }

      return this.prisma.user.update({
         where: { id: userId },
         data: updateUserDto,
         select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            createdAt: true,
            updatedAt: true
         }
      })
   }

   async findByEmail(email: string) {
      return this.prisma.user.findUnique({
         where: { email },
      })
   }
}
