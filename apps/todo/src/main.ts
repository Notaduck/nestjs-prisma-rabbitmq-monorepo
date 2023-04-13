// import { NestFactory } from '@nestjs/core';
// import { TodoModule } from './todo.module';

// async function bootstrap() {
//   const app = await NestFactory.create(TodoModule);
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { RmqService } from '@app/rmq';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TODO'));
  await app.startAllMicroservices();
}
bootstrap();