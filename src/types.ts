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
    status?: MessageStatus; //消息状态
    createdAt: string;//创建时间
    updatedAt: string; //更新时间
}
//进程中需要的参数
export interface CreateChatProps {
    // content: string //问题的内容
    messages: {//更精确获取问题内容，需要进行对应限制
        role: string,//'user' | 'assistant'
        content: string
    }[]
    providerName: string//哪一个服务商
    selectedModel: string//选择具体的模型
    messageId: number //消息的id
}
//获取大模型的返回数据
export interface UpdatedStreamData {
    messageId: number, //修改的哪个message
    data: {
        is_end: boolean,
        result: string,
    }
}
//确保回调函数参数格式正确
export type OnUpdatedCallback = (data: UpdatedStreamData) => void