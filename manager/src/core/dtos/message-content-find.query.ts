export class MessageContentFindQuery {
    accessKey: string;
}

export class MessageContentFindResponse {
   public readonly content: string;

   constructor(content: string){
    this.content = content;
   }
}