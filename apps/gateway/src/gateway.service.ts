import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {

  constructor(private readonly prisma: PrismaService) { }
  getHello(): string {
    return 'Wooow'
  }
}
