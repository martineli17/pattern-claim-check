export class MessageContentFindQuery {
    accessKey: string;
}

export class MessageContentFindResponse {
    content: string;

    constructor(content: string){
        this.content = content;
    }
}

export class MessageContentMarkAsUsedCommand {
    accessKey: string;
}

export class MessageContentMarkAsUsedResponse {
    content: string;

    constructor(content: string){
        this.content = content;
    }
}