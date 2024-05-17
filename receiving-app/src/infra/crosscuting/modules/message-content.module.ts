import { Module, Scope } from "@nestjs/common";
import { ClientGrpc, ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { IMessageContentGrpcService } from "src/infra/integrations/message-content/igrpcservice";
import { MessageContentService } from "src/infra/integrations/message-content/service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'message_content_grpc',
                transport: Transport.GRPC,
                options: {
                    package: 'message_content',
                    protoPath: [join(__dirname, '../../integrations/message-content/contract.proto')],
                    url: "localhost:3000",
                },
            },
        ]),
    ],
    providers: [
        {
            provide: 'MessageContentServiceGrpc',
            useFactory: (grpcClient: ClientGrpc): IMessageContentGrpcService => {
                return grpcClient.getService<IMessageContentGrpcService>('MessageContentService');
            },
            inject: ['message_content_grpc'],
            scope: Scope.DEFAULT
        },
        {
            provide: 'IMessageContentService',
            useClass: MessageContentService,
            scope: Scope.DEFAULT
        }
    ],
    exports: [
        'IMessageContentService'
    ]
})
export class MessageContentModule {

}