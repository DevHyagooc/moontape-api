import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TitlesModule } from './modules/titles/titles.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ViewingsModule } from './modules/viewings/viewings.module';
import { LibraryModule } from './modules/library/library.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TitlesModule,
    ViewingsModule,
    WatchlistModule,
    FavoritesModule,
    LibraryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
