import { defineStore } from "pinia";
import { ConversationProps } from "src/types";
import { db } from "../db";

export interface ConversationStore {
    items: ConversationProps[],
    selectedId:number,
}

export const useConversationStore = defineStore('conversation', {
    //状态
    state: (): ConversationStore => ({
        items: [],
        //表示没有选中任何conversationList
        selectedId:-1,
    }),
    actions: {
        async fetchConversations() {
            const items = await db.conversations.toArray()
            this.items = items
        },
        async createConversation(createData: Omit<ConversationProps, 'id'>) {
            const newCId = await db.conversations.add(createData)
            this.items.push({
                id: newCId,
                ...createData
            })
            return newCId
        }
    },
    getters:{
        //通过id获取相应的items值
        getConversationById:(state)=>(id:number)=>{
            return state.items.find(item=>item.id===id)
        }
    }
})