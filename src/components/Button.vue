<template>
    <!-- disabled：禁用时候显示的样式 -->
    <button class=" shadow-sm inline-flex items-center justify-center
     disabled:opacity-50 disabled:pointer-events-none" :class="[colorClasses, SizeClasses]"
        :disabled="disabled || loading">
        <Icon :icon="iconWithLoading" width="15" height="15" class=" mx-2" v-if="iconWithLoading"></Icon>
        <slot></slot><!-- 接收父组件中传入的值 -->
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

export type ButtonColor = 'green' | 'purple';
export type ButtonSize = 'large' | 'small';
// 组件属性
export interface ButtonProps {
    color?: ButtonColor
    size?: ButtonSize;
    plain?: boolean;
    disabled?: boolean;
    loading?: boolean;
    iconName?: string;
}
//设置组件名称
defineOptions({
    name: 'Button'
})
//设置默认样式
const props = withDefaults(defineProps<ButtonProps>(), {
    color: 'green'
});

const colorVariants: Record<ButtonColor, any> = {
    //键
    'green': {
        //两个值
        plain: 'bg-green-50 text-green-700 hover:bg-green-700 border border-green-700',
        normal: 'bg-green-700 text-white hover:bg-green-700/90 border border-green-700',
    },
    'purple': {
        plain: 'bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white border border-purple-700 text-white',
        normal: 'bg-purple-700 text-white hover:bg-purple-700/90 border border-purple-700 ',
    }
}
//计算属性变换plain和normal
const colorClasses = computed(() => {
    if (props.plain) {//获取父组件传来的值
        return colorVariants[props.color].plain;
    } else {
        return colorVariants[props.color].normal;
    }
})
//分配字体大小
const SizeClasses = computed(() => {
    if (!props.size) {
        return 'h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]'
    } else {
        if (props.size === 'large') {
            return 'h-[40px] py-[12px] px-[19px] rounded-[4px] text-base'
        } else {
            return 'h-[24px] py-[11px] px-[5px] rounded-[3px] text-xs'
        }
    }
})
//动态切换按钮是否为disabled
const iconWithLoading = computed(() => {
    if (props.loading) {
        return 'line-md:loading-alt-loop'
    } else {
        return props.iconName
    }
})
</script>

<style scoped></style>