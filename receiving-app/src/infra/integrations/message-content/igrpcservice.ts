import { Observable } from "rxjs";
import { MessageContentFindQuery, MessageContentFindResponse, MessageContentMarkAsUsedCommand, MessageContentMarkAsUsedResponse } from "./dto";

export interface IMessageContentGrpcService {
    get(command: MessageContentFindQuery): Observable<MessageContentFindResponse>;
    markAsUsed(command: MessageContentMarkAsUsedCommand): Observable<void>;
}