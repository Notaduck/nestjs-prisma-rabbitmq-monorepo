import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './constants';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
  ) { }

  @Get('/hell')
  getO() {


    this.userClient.emit('event_test', {
      message: 'YOLO',
    })

    return 'o'
  }

  @Get()
  async getHello() {

    this.userClient.emit('event_test', {
      message: 'YOLO',
    })

    // return this.gatewayService.getHello();
  }
}
