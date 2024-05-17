import { Inject } from "@nestjs/common";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import { IMessageContentService } from "src/core/interfaces/imessage-content.service";

export class DemoSubscriber {
    constructor(@Inject('IMessageContentService') private readonly _messageContentService: IMessageContentService,
        @Inject('BrokerClient') private readonly _awsClient: SQSClient) {
    }

    handle() {
        const app = Consumer.create({
            sqs: this._awsClient,
            shouldDeleteMessages: true,
            queueUrl: `${process.env.AWS_QUEUE_ENDPOINT}queue-message-content-demo`,
            handleMessage: async (message) => {
                const messageBodyJson = JSON.parse(message.Body);
                const content = messageBodyJson as { accessKey: string | null, payload: any | null };

                if (content.accessKey) {
                    console.log("SEARCHING THE PAYLOAD FROM DATABASE");
                    content.payload = await this._messageContentService.findAsync(content.accessKey);
                    await this._messageContentService.markAsUsedAsync(content.accessKey);
                }

                console.log(content);
            },
        });

        app.on("processing_error", (err) => {
            console.error("queue-message-content-demo error - " + err.message);
        });

        app.start();
    }
}