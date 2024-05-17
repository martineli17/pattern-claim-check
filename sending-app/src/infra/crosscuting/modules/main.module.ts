import { Module } from "@nestjs/common";
import { DemoController } from "src/apresentation/controllers/demo.controller";
import { MensageriaModule } from "./broker.module";
import { MessageContentModule } from "./message-content.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MensageriaModule,
        MessageContentModule
    ],
    controllers: [DemoController],
})
export class MainModule {

}