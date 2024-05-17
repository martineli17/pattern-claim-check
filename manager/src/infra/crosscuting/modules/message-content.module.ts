import { Module } from "@nestjs/common";
import { MessageContentGateway } from "../../data/gateways/message-content.gateway";
import { MessageContentGrpcService } from "src/apresentation/grpc/services/message-content.grpc";

@Module({
    controllers: [MessageContentGrpcService],
    exports: [],
    imports: [],
    providers: [MessageContentGateway]
})
export class MessageContentModule {

}