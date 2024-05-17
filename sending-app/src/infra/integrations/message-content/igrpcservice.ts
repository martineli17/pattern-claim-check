import { Observable } from "rxjs";
import { MessageContentAddCommand, MessageContentAddResponse } from "./dto";

export interface IMessageContentGrpcService {
    add(command: MessageContentAddCommand): Observable<MessageContentAddResponse>;
}