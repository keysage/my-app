export interface ConversationProps {
    id: number
    title: string //
    selectedModel: string //
    createdAt: string //创建时间
    updatedAt: string //更新时间
    providerId: number //ai模型提供商
}
//大模型选择的信息
export interface ProviderProps {
    id: number;
    name: string; //大模型名字
    title?: string; //中文名称
    desc?: string; //说明信息
    avatar?: string; //头像
    createdAt: string;//创建时间
    updatedAt: string; //更新时间
    models: string[] //模型列表
}

//聊天界面的消息
export type MessageStatus = 'loading' | 'streaming' | 'finished';
export interface MessageProps {
    id: number;
    content: string; //聊天内容
    type: 'question' | 'answer'//提的问题或者是大模型返回的答案
    conversationId: number //所属的对话id
    status?:MessageStatus; //消息状态
    createdAt: string;//创建时间
    updatedAt: string; //更新时间
}