import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RmqService } from '@app/rmq';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly rmqService: RmqService) { }

  @Get(':email')
  async getHello(@Param('email') email: string) {
    return this.usersService.asyncFindOneByEmail(email);
  }


  @EventPattern('event_test')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.usersService.asyncFindOneByEmail('alice@example.com')
    this.rmqService.ack(context);
  }
}
