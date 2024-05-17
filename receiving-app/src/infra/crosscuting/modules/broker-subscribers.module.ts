import { Module, Scope } from "@nestjs/common";
import { SQSClient } from "@aws-sdk/client-sqs";
import { DemoSubscriber } from "src/apresentation/broker-subscribers/demo.subscriber";
import { RegisterSubscribers } from "src/apresentation/broker-subscribers/register.subscribers";
import { MessageContentModule } from "./message-content.module";

@Module({
    imports: [
        MessageContentModule,
    ],
    providers: [
        {
            provide: 'BrokerClient',
            useFactory: () => {
                return new SQSClient({
                    endpoint: process.env.AWS_ENDPOINT,
                })
            },
            scope: Scope.DEFAULT
        },
        {
            provide: DemoSubscriber,
            useClass: DemoSubscriber,
            scope: Scope.DEFAULT,
        },
        {
            provide: RegisterSubscribers,
            useClass: RegisterSubscribers,
            scope: Scope.DEFAULT,
        },
    ],
    exports: [
        'BrokerClient',
    ]
})
export class MensageriaModule {

}