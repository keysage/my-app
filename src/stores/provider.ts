//大模型的所有信息
import { defineStore } from 'pinia'
import { db } from '../db'
import { ProviderProps } from '../types'

// 定义 ProviderStore 接口，用于描述提供者存储的结构
export interface ProviderStore {
    // items 属性是一个 ProviderProps 类型的数组，用于存储提供者相关的数据项
    items: ProviderProps[];
}

export const useProviderStore = defineStore('provider', {
    state: (): ProviderStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchProviders() {
            const items = await db.providers.toArray()
            this.items = items
        }
    },
    getters: {
        getProviderById: (state) => (id: number) => {
            return state.items.find(item => item.id === id)
        }
    }
})