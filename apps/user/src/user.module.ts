import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/prisma';
import { RmqModule } from '@app/rmq';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_USER_QUEUE: Joi.string().required(),
    }),
  }), PrismaModule, RmqModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule { }
