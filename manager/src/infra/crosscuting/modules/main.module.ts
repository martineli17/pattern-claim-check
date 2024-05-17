import { Module } from "@nestjs/common";
import { DataModule } from "./data.module";
import { MessageContentModule } from "./message-content.module";

@Module({
    imports:[
        DataModule,
        MessageContentModule,
    ]
})
export class MainModule{
    
}