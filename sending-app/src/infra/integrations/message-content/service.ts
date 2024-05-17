import { Inject } from '@nestjs/common';
import { firstValueFrom } from "rxjs";
import { IMessageContentService } from "../../../core/interfaces/imessage-content.service";
import { IMessageContentGrpcService } from './igrpcservice';

export class MessageContentService implements IMessageContentService {

    constructor(@Inject('MessageContentServiceGrpc') private readonly messageContentGrpc: IMessageContentGrpcService) {
    }

    async saveAsync(content: string): Promise<string> {
        const result = await firstValueFrom(this.messageContentGrpc.add({ content }));
        console.log(result)
        return result.accessKey;
    }
}