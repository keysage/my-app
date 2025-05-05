<!-- 右侧消息页面 -->
<template class=" ">
    <div class="h-[8%] flex bg-gray-300 justify-between items-center px-3 ">
        <!-- 111 -->
        <h3 class=" text-lg font-bold text-gray-900">{{ conversation?.title }}</h3>
        <span class=" text-sm text-gray-600">{{ dayjs(conversation?.createdAt).format('YYYY-MM-DD,HH:mm') }}</span>
    </div>
    <div class=" h-full w-full">
        <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2 ">
            <MessageList :messages="filterMessages"></MessageList>
        </div>
        <div class="w-[80%] mx-auto h-[15%] ">
            <MessageInput @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading"
                @click="test"></MessageInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { MessageProps, ConversationProps, MessageStatus } from "src/types";
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useConversationStore } from "../stores/conversation";
import { useMessageStore } from "../stores/message";
import { useProviderStore } from "../stores/provider";
import { computed, onMounted, ref, watch } from 'vue';
import { db } from '../db'
//调用useroute api
import { useRoute } from 'vue-router';
//使用useroute
const route = useRoute()
const inputValue = ref('')
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const providerStore = useProviderStore()
const filterMessages = computed(() => messageStore.items) // 消息列表
//过滤createdData信息,只留下上下文信息
const sendedMessages = computed(() => filterMessages.value
    .filter(message => message.status !== 'loading')
    .map(message => {
        return {
            role: message.type === 'question' ? 'user' : 'assistant',
            content: message.content
        }
    })
)
const test = () => {
    console.log(messageStore.isMessageLoading)
}
// const conversation = ref<ConversationProps | null | undefined>(null)  // 大模型模型名称
let conversationId = ref(parseInt(route.params.id as string)) // 列表栏的id值
//将数据绑定到conversation中
const conversation = computed(() => {
    return conversationStore.getConversationById(conversationId.value) // 大模型模型名称
})
const initMessagesId = parseInt(route.query.init as string)  //获取home传来的初始化init值
const lastQuestion = computed(() => {
    return messageStore.getLastQuestion(conversationId.value)
})
//处理input框信息,收集新的输入框信息
const sendNewMessage = async (question: string) => {
    if (question) {
        const date = new Date().toISOString()
        await messageStore.createMessage({
            content: question,
            conversationId: conversationId.value,
            type: 'question',
            createdAt: date,
            updatedAt: date,
        })
        inputValue.value = ''
        createtingInitialMessage()
    }
}
//获取初始提问的问题

//最初始回复信息
const createtingInitialMessage = async () => {
    //使用ts内置api Omit删除id属性，id属性会由数据库创建
    //创建最初的返回信息
    const createdData: Omit<MessageProps, 'id'> = {
        content: '',
        conversationId: conversationId.value,
        type: 'answer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'loading'
    }
    // 返回新的id(数据库自增)
    const newMessageId = await messageStore.createMessage(createdData)
    // 将数据插入目前响应式数据中
    filterMessages.value.push({ id: newMessageId, ...createdData })
    if (conversation.value) {
        const provider = providerStore.getProviderById(conversation.value.providerId)
        if (provider) {
            await window.electronAPI.startChat({
                messageId: newMessageId,// 新创建的消息 ID（数据库生成）
                providerName: provider.name, // AI 提供者名称（如 "OpenAI"）
                selectedModel: conversation.value.selectedModel,// 用户选择的模型（如 "gpt-3.5-turbo"）
                messages: sendedMessages.value,// 更精确获取问题内容
                // content: lastQuestion.value?.content || '' // 用户提问的内容
            })
        }
    }
}

// 初始化
watch(() => route.params.id, async (newId) => {
    conversationId.value = parseInt(newId as string)
    // 查找对话
    await messageStore.fetchMessagesByConversation(conversationId.value)
    // const foundConv = conversations.find(item => item.id === convId)
    // conversation.value = foundConv || null
    // // 过滤消息
    // filterMessages.value = messages.filter(msg => msg.conversationId === convId)
}, { immediate: true })

onMounted(async () => {
    await messageStore.fetchMessagesByConversation(conversationId.value)
    //调用api输出接收数据
    window.electronAPI.onUpdateMessage(async (streamData) => {
        //update database
        //update filterMessages
        messageStore.updateMessage(streamData)
    })
    //初始化回复信息
    if (initMessagesId) {
        await createtingInitialMessage()
    }
})

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