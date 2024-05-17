import { Module } from "@nestjs/common";
import { MensageriaModule } from "./broker-subscribers.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MensageriaModule,
    ],
})
export class MainModule {

}