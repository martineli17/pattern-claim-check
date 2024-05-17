export class MessageContentAddCommand {
    content: string;
}

export class MessageContentAddResponse {
    accessKey: string;

    constructor(accessKey: string){
        this.accessKey = accessKey;
    }
}