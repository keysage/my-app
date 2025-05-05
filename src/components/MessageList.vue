<template>
    <div class="message-list ">
        <div class="message-item mb-3" v-for="message in messages">
            <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
                <div>
                    <p class=" text-sm text-gray-500 mb-2" :class="{ 'text-right': message.type === 'question' }">
                        {{ dayjs(message.createdAt).format('HH:mm:ss') }}
                    </p>
                    <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
                        {{ message.content }}
                    </div>
                    <div class="message-question bg-gray-200 text-gray-700 p-2 rounded-md" v-else>
                        <template v-if="message.status ==='loading'">
                            <Icon icon="eos-icons:three-dots-loading" width="24" height="24"></Icon>
                        </template>
                        <template v-else>
                            {{ message.content }}
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { MessageProps } from 'src/types';
import dayjs from 'dayjs'
defineProps<{ messages: MessageProps[] }>()
</script>

<style scoped></style>