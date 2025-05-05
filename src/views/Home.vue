<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%] ">
            <ProviderSelect :items="providerStore.items" v-model="curentProvider" />
        </div>
        <div class=" h-[15%]">
            <MessageInput @create="createConversation" :disabled="curentProvider ===''"></MessageInput>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ProviderSelect from "../components/ProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { ProviderProps } from "src/types";
import { useConversationStore } from "../stores/conversation";
import { useProviderStore } from "../stores/provider"
import { db } from "../db";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const curentProvider = ref('') //当前选择的大模型
// const providers = ref<ProviderProps[]>([]) //大模型的所有信息
const conversationStore = useConversationStore()
const providerStore = useProviderStore()
// const providers = computed(() => providerStore.items)//大模型的所有信息

//挂载完成后获取数据库数据
onMounted(async () => {
    await providerStore.fetchProviders()//大模型的所有信息
    // console.log('所有对话:', await db.conversations.toArray())
    // console.log('所有消息:', await db.messages.toArray())
})

const modelInfo = computed(() => {
    const [providerId, selectedModel] = curentProvider.value.split('/')
    return {
        providerId: parseInt(providerId), // 将服务商ID转换为数字
        selectedModel,                    // 提取模型名称
    }
})

const createConversation = async (question: string) => {
    // console.log('收到问题:', question) // 调试输出
    // console.log('当前选择的模型:', curentProvider.value) // 验证模型选择

    const { providerId, selectedModel } = modelInfo.value
    const currentDate = new Date().toISOString()
    const conversationId = await conversationStore.createConversation({
        title: question, // 用问题作为对话标题
        providerId,     // 服务商ID
        selectedModel,
        createdAt: currentDate,
        updatedAt: currentDate,
    })
    const newMessageId = await db.messages.add({
        content: question,
        conversationId,
        createdAt: currentDate,
        updatedAt: currentDate,
        type: 'question',
    })
    conversationStore.selectedId = conversationId
    router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}

</script>

<style scoped></style>