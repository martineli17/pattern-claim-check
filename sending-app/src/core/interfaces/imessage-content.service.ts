export interface IMessageContentService {
    saveAsync(content: string): Promise<string>;
}