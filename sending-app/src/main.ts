import { NestFactory } from '@nestjs/core';
import { MainModule } from './infra/crosscuting/modules/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(3002);
}
bootstrap();
