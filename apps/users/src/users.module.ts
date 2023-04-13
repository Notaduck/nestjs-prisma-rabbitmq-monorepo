import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '@app/prisma';
import { RmqModule } from '@app/rmq';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_USER_QUEUE: Joi.string().required(),
    }),
  }), PrismaModule, RmqModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
