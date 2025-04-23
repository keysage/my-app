import Dexie, { type EntityTable } from "dexie";
import { providers } from "./testData";
import { ProviderProps, ConversationProps, MessageProps } from "src/types";

//创建数据库实例
export const db = new Dexie("vChatDatabase") as Dexie & {
    providers: EntityTable<ProviderProps, "id">,
    conversations: EntityTable<ConversationProps, "id">,
    messages: EntityTable<MessageProps, "id">
};

// 创建数据库和表
db.version(1).stores({
    providers: '++id,name',
    conversations: '++id,providerId',
    messages: '++id,conversationId'
})

// 初始化数据
export const initProviers = async () => {
    const count = await db.providers.count()
    if (count === 0) {
        db.providers.bulkAdd(providers)
    }
}