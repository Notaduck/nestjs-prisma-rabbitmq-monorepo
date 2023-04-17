import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RmqService } from '@app/rmq';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserController {
  private logger = new Logger()
  constructor(private readonly usersService: UserService, private readonly rmqService: RmqService) { }

  @Get(':email')
  async getHello(@Param('email') email: string) {
    return this.usersService.asyncFindOneByEmail(email);
  }




  @EventPattern('event_test')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.usersService.testEvent(data, context)

    let user = await this.usersService.asyncFindOneByEmail('alice@example.com')
    this.logger.debug(`Yo, i got that message ^
    
  `, user)
    this.rmqService.ack(context);
  }
}
