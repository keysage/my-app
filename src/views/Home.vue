<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%] ">
            <ProviderSelect :items="providers" v-model="curentProvider" />
        </div>
        <div class=" h-[15%]">
            <MessageInput @create="createConversation"></MessageInput>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ProviderSelect from "../components/ProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { ProviderProps } from "src/types";
import { db } from "../db";
import { ref,onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const curentProvider = ref('')
const router = useRouter()
const providers = ref<ProviderProps[]>([])

//挂载完成后获取数据库数据
onMounted(async()=>{
    providers.value =await db.providers.toArray()
})

const modelInfo =computed(()=>{
    const [providerId,selectedModel] = curentProvider.value.split('/')
    return{
        providerId:parseInt(providerId),
        selectedModel,
    }
})

const createConversation = async(question:string)=>{
    const {providerId,selectedModel} = modelInfo.value
    const currentDate = new Date().toISOString()
    const conversationId = await db.conversations.add({
        title:question,
        providerId,
        selectedModel,
        createdAt:currentDate,
        updatedAt:currentDate,
    })
    const newMessageId = await db.messages.add({
        content:question,
        conversationId,
        createdAt:currentDate,
        updatedAt:currentDate,
        type:'question',
    })

    router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}

</script>

<style scoped></style>