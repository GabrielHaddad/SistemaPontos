import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';

@Module({
  imports: [PointsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://Breno:db1234@cluster0-qcxlb.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
