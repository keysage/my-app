import { defineStore } from 'pinia'
import { db } from '../db'
import { MessageProps, MessageStatus, UpdatedStreamData } from '../types'

export interface MessageStore {
    items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
    state: (): MessageStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchMessagesByConversation(conversationId: number) {
            const items = await db.messages.where({ conversationId }).toArray()
            this.items = items
        },
        //添加数据
        async createMessage(createData: Omit<MessageProps, 'id'>) {
            const newMessageId = await db.messages.add(createData)
            this.items.push({
                id: newMessageId,
                ...createData
            })
            return newMessageId
        },
        async updateMessage(streamData: UpdatedStreamData) {
            const { messageId, data } = streamData
            const currentMessage = this.items.find(item => item.id === messageId)
            if (currentMessage) {
                const updatedData = {
                    status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
                    updatedAt: new Date().toISOString(),
                    ...(!data.is_end && {content: currentMessage.content + data.result,} )
                }
                await db.messages.update(messageId, updatedData)
                // 更新消息列表
                const index = this.items.findIndex((item) => item.id === messageId)
                if (index !== -1) {
                    //旧属性加上新属性
                    this.items[index] = { ...this.items[index], ...updatedData }
                }
            }
        },
    },
    getters: {
        getLastQuestion: (state) => (conversationId: number) => {
            return state.items.findLast(item => item.type === 'question' && item.conversationId === conversationId)
        },
        //在数据流开始时禁用发送按钮
        isMessageLoading: (state) =>{
            // console.log(state.items.);
            return state.items.some(item => item.status === 'loading' || item.status === 'streaming')
        }
    }

})