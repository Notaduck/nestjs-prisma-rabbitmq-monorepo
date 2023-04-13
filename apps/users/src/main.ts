import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/rmq';
import { UserModel } from 'libs/prisma/prisma/src/zod';

async function bootstrap() {
  const app = await NestFactory.create(UserModel);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('USER'));
  await app.startAllMicroservices();
}
bootstrap();