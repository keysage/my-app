import Dexie, { type EntityTable } from "dexie";
import { providers } from "./testData";
import { ProviderProps, ConversationProps, MessageProps } from "src/types";

//创建数据库实例
export const db = new Dexie("vChatDatabase") as Dexie & {
    providers: EntityTable<ProviderProps, "id">,//存储大模型列表
    conversations: EntityTable<ConversationProps, "id">,//存储对话列表
    messages: EntityTable<MessageProps, "id"> //存储聊天记录
};

// 创建数据库和表
db.version(1).stores({
    providers: '++id,name',
    conversations: '++id,providerId',
    messages: '++id,conversationId' 
})
//这是初始化数据
// 初始化数据
export const initProviers = async () => {
    //查询数据
    const count = await db.providers.count()
    //创建初始数据
    if (count === 0) {
        db.providers.bulkAdd(providers)
    }
}