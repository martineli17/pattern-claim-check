import { Injectable, Scope } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { v4 } from 'uuid';
import { MessageContentAddCommand, MessageContentAddResponse } from "src/core/dtos/message-content-add.command";
import { IMessageContentGateway } from "src/core/interfaces/imessage-content.gateway";
import { MessageContentModel } from "../models/message-content.model";
import { MessageContentSchema } from "../schemas/message-content.schema";
import { MessageContentFindQuery, MessageContentFindResponse } from "src/core/dtos/message-content-find.query";

@Injectable({ scope: Scope.REQUEST })
export class MessageContentGateway implements IMessageContentGateway {
    private readonly _repository: Repository<MessageContentModel>;

    constructor(dataSource: DataSource) {
        this._repository = dataSource.getRepository<MessageContentModel>(MessageContentSchema);
    }

    async saveAsync(command: MessageContentAddCommand): Promise<MessageContentAddResponse> {
        const accessKey = v4();
        const entity: MessageContentModel = {
            accessKey: accessKey,
            content: JSON.parse(command.content),
            createdAt: new Date(),
        };

        await this._repository.save(entity);
        return new MessageContentAddResponse(accessKey);
    }

    async findAsync(query: MessageContentFindQuery): Promise<MessageContentFindResponse> {
        const entity = await this._repository.findOne({
            where: {
                accessKey: query.accessKey,
            }
        });
        return new MessageContentFindResponse(JSON.stringify(entity?.content));
    }

    async markAsUsedAsync(accessKey: string): Promise<void> {
        const entity = await this._repository.findOne({
            where: {
                accessKey: accessKey,
            }
        });

        await this._repository.remove(entity);
    }
}