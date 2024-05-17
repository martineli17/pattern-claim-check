import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageContentSchema } from 'src/infra/data/schemas/message-content.schema';

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env']
      }),
      TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DATABASE_HOST ?? "localhost",
        port: Number(process.env.DATABASE_PORT)  ?? 5432,
        username: process.env.DATABASE_USERNAME  ?? "test",
        password: process.env.DATABASE_PASSWORD  ?? "test",
        database: process.env.DATABASE_NAME  ?? "test",
        synchronize: false,
        logging: true,
        entities: [MessageContentSchema],
        subscribers: [],
        migrations: [],
        migrationsRun: false,
        poolSize: 5,
      }),
    ],
  })
  export class DataModule { }
  