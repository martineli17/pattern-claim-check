import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { MessageContentAddCommand, MessageContentAddResponse } from "src/core/dtos/message-content-add.command";
import { MessageContentFindQuery, MessageContentFindResponse } from "src/core/dtos/message-content-find.query";
import { IMessageContentGateway } from "src/core/interfaces/imessage-content.gateway";
import { MessageContentGateway } from "src/infra/data/gateways/message-content.gateway";

@Controller()
export class MessageContentGrpcService {
    constructor(@Inject(MessageContentGateway) private readonly _gateway: IMessageContentGateway) {

    }

    @GrpcMethod('MessageContentService', 'add')
    async add(data: MessageContentAddCommand, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<MessageContentAddResponse> {
        const result = await this._gateway.saveAsync(data);
        return result;
    }

    @GrpcMethod('MessageContentService', 'get')
    async get(data: MessageContentFindQuery, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<MessageContentFindResponse> {
        const result = await this._gateway.findAsync(data);
        return result;
    }

    @GrpcMethod('MessageContentService', 'markAsUsed')
    async markAsUsed(data: { accessKey: string }, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<void> {
        await this._gateway.markAsUsedAsync(data.accessKey);
    }
}