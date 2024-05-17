export interface IMessageContentService {
    findAsync(accessKey: string): Promise<object>;
    markAsUsedAsync(accessKey: string): Promise<void>;
}