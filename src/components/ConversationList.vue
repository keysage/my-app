<!-- 左侧列表样式 -->
<template>
  <div class="conversation-list">
    <div class="item border-gray-300 border-t cursor-pointer p-2" :class="{
      'bg-gray-300 hover:bg-gray-300': store.selectedId === item.id,
      'bg-white hover:bg-gray-200': store.selectedId !== item.id
    }" v-for="item in items" :key="item.id">
      <!-- 动态获取列表 -->
      <!-- <router-link ></router-link> -->
      <a @click="goToConversation(item.id)">
        <!-- <router-link :to="`/conversation/${item.id}`"> -->
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
        <!-- </router-link> -->
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ConversationProps } from "../types"
import dayjs from "dayjs"
//引入pina完成id绑定实行点击后颜色变换
import { useConversationStore } from "../stores/conversation";
const props = defineProps<{ items: ConversationProps[] }>()
// 使用router完成跳转
import { useRouter } from "vue-router"
const router = useRouter()
const store = useConversationStore()
const goToConversation = (id: number) => {
  router.push({ path: `/conversation/${id}` })
  // 绑定选中id
  store.selectedId = id
}
</script>

<style scoped></style>