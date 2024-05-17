import { Controller, Inject, Post, Body, Res } from "@nestjs/common";
import { SQS } from "aws-sdk";
import { Response } from "express";
import { IMessageContentService } from "src/core/interfaces/imessage-content.service";

@Controller("sending")
export class DemoController {
    constructor(@Inject('IMessageContentService') private readonly _messageContentService: IMessageContentService,
                @Inject('BrokerClient') private readonly _awsClient: SQS){
    }

    @Post()
    async sendMessage(@Body() request: any, @Res() response: Response){
        const requestJsonString = JSON.stringify(request);
        const requestContentEnconded = new TextEncoder().encode(requestJsonString);
        const requestContentSize = requestContentEnconded.byteLength;
        const body = {
            accessKey: null,
            payload: null
        };

        if(requestContentSize > 50){
            body.accessKey = await this._messageContentService.saveAsync(requestJsonString);
            await this.sendToBrokerAsync(body);
            response.json({message: "Conteúdo salvo no banco", response: body}).status(200);
        }

        else {
            body.payload = request;
            await this.sendToBrokerAsync(body);
            response.json({message: "Conteúdo enviado diretamente para a mensageria"}).status(200);
        }
    }

    private async sendToBrokerAsync(body: any){
        await this._awsClient.sendMessage({
            QueueUrl: `${process.env.AWS_QUEUE_ENDPOINT}queue-message-content-demo`,
            MessageBody: JSON.stringify(body),
        }).promise();
    }
}