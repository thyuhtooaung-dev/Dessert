import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DessertsController } from './desserts/desserts.controller';
import { DessertsService } from './desserts/desserts.service';
import { DessertsModule } from './desserts/desserts.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DessertsModule, PrismaModule],
  controllers: [AppController, DessertsController],
  providers: [AppService, DessertsService, PrismaService],
})
export class AppModule {}
