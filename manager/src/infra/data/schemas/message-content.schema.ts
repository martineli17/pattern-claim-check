import { EntitySchema } from "typeorm";
import { MessageContentModel } from "../models/message-content.model";

export const MessageContentSchema = new EntitySchema<MessageContentModel>({
    name: 'message_content',
    columns: {
        accessKey: {
            type: 'text',
            primary: true,
            nullable: false,
        },
        content: {
            type: 'jsonb',
            nullable: false,
        },
        createdAt: {
            type: 'date',
            nullable: false,
            default: new Date(),
        },
    }
});