<template>
    <div class="h-[8%] flex bg-gray-300 justify-between items-center px-3" >
        <!-- 111 -->
        <h3 class=" text-lg font-bold text-gray-900">{{ conversation?.title}}</h3>
        <span class=" text-sm text-gray-600">{{ conversation?.createdAt }}</span>
    </div>
    <div class=" h-full w-full">
        <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
            <MessageList :messages="filterMessages"></MessageList>
        </div>
        <div class="w-[80%] mx-auto h-[15%] ">
            <MessageInput></MessageInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import { messages, conversations } from "../testData"
import { MessageProps, ConversationProps } from "src/types";
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { computed, ref, watch } from 'vue';
//调用useroute api
import { useRoute } from 'vue-router';
//使用useroute
const route = useRoute()
// watch方法定义响应式数据
const filterMessages = ref<MessageProps[]>([])
const conversation =ref<ConversationProps | null>(null) 
let conversationId = parseInt(route.params.id as string)
// 初始化
filterMessages.value = messages.filter(msg => msg.conversationId === conversationId)
watch(() => route.params.id,(newId) => {
    const convId = parseInt(newId as string)
    // 查找对话
    const foundConv = conversations.find(item => item.id === convId)
    conversation.value = foundConv || null
    // 过滤消息
    filterMessages.value = messages.filter(msg => msg.conversationId === convId)
  },
  { immediate: true } // 关键：首次加载触发
)


// //computed的方法变为响应式数据
// const filterMessages =computed(() => {
//获取路由参数（id为变量）转为数字类型
//     const conversationId = parseInt(route.params.id as string)
//     return messages.filter(msg => msg.conversationId === conversationId)
// })

// 计算属性自动响应路由变化
// const filterMessages = computed(() => {
//     //获取路由参数（id为变量）转为数字类型
//     const convId = parseInt(route.params.id as string)
//     return messages.filter(msg => msg.conversationId === convId)
// })
</script>

<style scoped></style>