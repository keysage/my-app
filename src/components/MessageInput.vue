<template>
    <div class="flex items-center h-[15%]">
        <input
            class="flex-1 focus:outline-2 border outline-none hover:border-green-300 focus:border-green-500  px-3 py-1.5 rounded-lg mr-1 placeholder:text-gray-500 text-sm"
            placeholder="请输入您要搜索的信息" type="text" v-model="model" :disabled="disabled">
        <button class="flex bg-green-600 text-sm text-white py-1 px-1 rounded  hover:bg-green-500 " @click="onCreate" :disabled="disabled">
            <Icon icon="iconamoon:send" width="20" height="20" class=" mx-0.5"></Icon>
            发送
        </button>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
defineProps<{ disabled?: boolean }>()

const emit = defineEmits<{ create: [value: string] }>()
const model = defineModel<string>()
const onCreate = () => {
    if (model.value && model.value.trim() !== '') {
        emit('create', model.value)
    }
}
</script>

<style scoped></style>