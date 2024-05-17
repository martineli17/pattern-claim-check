import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { MainModule } from './infra/crosscuting/modules/main.module';
import { join } from 'path';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MainModule, {
    transport: Transport.GRPC,
    options: {
      package: 'message_content',
      protoPath: [join(__dirname, './apresentation/grpc/protos/message-content.proto')],
      url: "localhost:3000",
    },
  });
  
  const dataSource = await app.resolve(DataSource);
  await dataSource.synchronize();
  await dataSource.runMigrations();

  await app.listen();
}

bootstrap();
