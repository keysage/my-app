<template>
    <div class="flex items-center justify-between h-screen">
        <!-- 左侧聊天数据 -->
        <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[90%] overflow-y-auto">
                <ConversationList :items="conversations" />
            </div>
            <!-- 新建聊天和设置 -->
            <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
                <router-link to="/">
                    <button class="shadow-sm inline-flex items-center justify-center 
                     bg-green-700 text-white hover:bg-green-700/90 border border-green-700
                      h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
                        <Icon icon="radix-icons:chat-bubble" width="15" height="15" class="mr-2"></Icon>
                        新建聊天
                    </button>
                </router-link>
                <router-link to="/settings">
                    <button class="shadow-sm inline-flex items-center justify-center 
                     bg-green-50 text-green-700 hover:bg-green-700 border border-green-700
                    hover:text-green-50 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
                        <Icon icon="uil:setting" width="18" height="18" class="mr-1"></Icon>
                        应用设置
                    </button>
                </router-link>
            </div>
        </div>
        <!-- 右侧问答搜索栏 -->
        <div class="h-full flex-1 ">
            <Button color="purple" :loading="loading" plain icon-name="radix-icons:gear" @click="handleloading">
            </Button>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Icon } from "@iconify/vue";
import ConversationList from './components/ConversationList.vue';
import { ConversationProps } from "./types";
import Button from "./components/Button.vue";
import { ref, onMounted } from "vue";
import { db, initProviers } from "./db";

const conversations = ref<ConversationProps[]>([])
const loading = ref(false)
const handleloading = () => {
    loading.value = true
}

onMounted(async () => {
    await initProviers()
    conversations.value = await db.conversations.toArray()
})
</script>

<style scoped></style>