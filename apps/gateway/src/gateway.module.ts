import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { PrismaModule } from '@app/prisma';
import { RmqModule } from '@app/rmq';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UsersModule } from 'apps/user/src/user.module';
import { USER_SERVICE } from './constants';

@Module({
  // imports: [PrismaModule, RmqModule.register({ name: TODO_SERVICE }), RmqModule.register({ name: USER_SERVICE }), ConfigModule.forRoot()],
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, RmqModule.register({ name: USER_SERVICE }), AuthModule, UsersModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
