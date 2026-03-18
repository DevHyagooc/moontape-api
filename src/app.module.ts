import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TitlesModule } from './modules/titles/titles.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TitlesModule,
    WatchlistModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
