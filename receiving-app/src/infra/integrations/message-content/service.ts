import { Inject } from '@nestjs/common';
import { firstValueFrom } from "rxjs";
import { IMessageContentService } from "../../../core/interfaces/imessage-content.service";
import { IMessageContentGrpcService } from './igrpcservice';

export class MessageContentService implements IMessageContentService {

    constructor(@Inject('MessageContentServiceGrpc') private readonly messageContentGrpc: IMessageContentGrpcService) {
    }

    async findAsync(accessKey: string): Promise<object> {
        const result = await firstValueFrom(this.messageContentGrpc.get({ accessKey }));
        return JSON.parse(result.content);
    }

    async markAsUsedAsync(accessKey: string): Promise<void> {
        await firstValueFrom(this.messageContentGrpc.markAsUsed({ accessKey }));
    }
}