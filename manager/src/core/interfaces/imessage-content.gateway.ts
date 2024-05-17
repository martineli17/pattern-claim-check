import { MessageContentAddCommand, MessageContentAddResponse } from "../dtos/message-content-add.command";
import { MessageContentFindQuery, MessageContentFindResponse } from "../dtos/message-content-find.query";

export interface IMessageContentGateway {
    saveAsync(command: MessageContentAddCommand): Promise<MessageContentAddResponse>;
    findAsync(query: MessageContentFindQuery): Promise<MessageContentFindResponse>;
    markAsUsedAsync(accessKey: string): Promise<void>;
}