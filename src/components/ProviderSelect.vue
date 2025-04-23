<template>
    <div class="provider-select w-full">
      <SelectRoot v-model="currentModel">
        <!-- 模型选择 -->
        <SelectTrigger class="flex w-full items-center justify-between
         rounded-md shadow-sm border outline-none py-1.5 px-3 data-[placeholder]:text-gray-400">
            <SelectValue placeholder="选择模型"></SelectValue>
            <Icon icon="tabler:chevron-down" width="24" height="24"></Icon>
        </SelectTrigger>

        <!-- 模型列表 -->
        <SelectPortal >
          <SelectContent class=" bg-white rounded-md shadow-md z-50 border ">
            <SelectViewport class="p-2">
                <div v-for="provider in items">
                    <!-- 大模型的图标和名字 -->
                    <SelectLabel class="flex items-center px-6 py-7 text-gray-500">
                        <img :src="provider.avatar" :alt="provider.name" class="h-5 w-5 mr-2 rounded">
                        {{ provider.name }}
                    </SelectLabel>
                    <!-- 这里对每一个大模型进行分组 -->
                    <SelectGroup>
                        <SelectItem 
                            v-for="(model,index) in provider.models" :key="index" :value="`${provider.id}/${model}`"
                            class=" outline-none rounded flex items-center h-7 px-6
                             text-green-700 cursor-pointer relative
                            data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                        >
                            <SelectItemIndicator class="">
                              <Icon icon="tabler:check" width="24" height="24"
                              class=" absolute top-0 left-0 ">
                              </Icon>
                            </SelectItemIndicator>
                            <SelectItemText>{{ model }}</SelectItemText>
                        </SelectItem>
                    </SelectGroup> 
                    <SelectSeparator class=" h-[1px] my-2 bg-gray-300"></SelectSeparator>
                </div>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { Icon } from '@iconify/vue'
  import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
    SelectLabel,
  } from 'radix-vue'
  
  import { ProviderProps } from '../types'
  defineProps<{ items: ProviderProps[] }>()
  const currentModel = defineModel<string>()
  </script>