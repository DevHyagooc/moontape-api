import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ViewingsController } from './viewings.controller';
import { ViewingsService } from './viewings.service';

@Module({
  imports: [PrismaModule],
  controllers: [ViewingsController],
  providers: [ViewingsService],
  exports: [ViewingsService],
})
export class ViewingsModule {}