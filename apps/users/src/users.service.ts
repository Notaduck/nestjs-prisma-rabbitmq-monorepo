import { PrismaService } from '@app/prisma';
import { RmqService } from '@app/rmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Prisma, User } from '@prisma/client';
import { USER_SERVICE } from 'apps/gateway/src/constants';

@Injectable()
export class UsersService {

  logger = new Logger()

  constructor(
    private readonly prismaService: PrismaService,
    private readonly rmqService: RmqService,
  ) {

  }


  @EventPattern('event_test')
  async testEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.debug(data, context)
    this.rmqService.ack(context)
  }

  async asyncFindOneByEmail(email: string): Promise<User> {
    const userEntity = await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    })
    return userEntity
  }

}
