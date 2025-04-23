<template>
  <div class="conversation-list">
    <div class="item border-gray-300 border-t cursor-pointer bg-white hover:bg-gray-200 p-2" v-for="item in items"
      :key="item.id">
      <!-- 动态获取列表 -->
      <!-- <router-link ></router-link> -->
      <a @click="goToConversation(item.id)">
        <!-- <router-link :to="`/conversation/${item.id}`"> -->
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ item.updatedAt }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
        <!-- </router-link> -->
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ConversationProps } from "../types"
const props = defineProps<{ items: ConversationProps[] }>()
// 使用router完成跳转
import { useRouter } from "vue-router"
const router = useRouter()
const goToConversation = (id:number)=>{
  router.push({
    path:`/conversation/${id}`,
    query:{name:'doctor'},
    hash:'#foo'
  })
}
</script>

<style scoped></style>