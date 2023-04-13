import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { PrismaModule } from '@app/prisma';
import { RmqModule } from '@app/rmq';
import { TODO_SERVICE, USER_SERVICE } from './constants';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'apps/users/src/users.module';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  // imports: [PrismaModule, RmqModule.register({ name: TODO_SERVICE }), RmqModule.register({ name: USER_SERVICE }), ConfigModule.forRoot()],
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, RmqModule.register({ name: USER_SERVICE }), AuthModule, UsersModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
