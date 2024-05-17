import { Module, Scope } from "@nestjs/common";
import { SQS } from "aws-sdk";

@Module({
    providers: [
        {
            provide: 'BrokerClient',
            useFactory: () => {
                return new SQS({
                    endpoint: process.env.AWS_ENDPOINT,
                    region: "us-east-1"
                })
            },
            scope: Scope.DEFAULT
        }
    ],
    exports: [
        'BrokerClient'
    ]
})
export class MensageriaModule {

}