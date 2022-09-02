<template>
    <div v-if="type" class="stamp-wrapper"
        :style="{ 'background-color': (type === 'credibleOrg' ? '#2B60E9' : '#774AFF') }">
        <slot name="content"></slot>
        <el-tooltip class="box-item" effect="light" :content="content" placement="top-start">
            <p class="cursor-pointer" @click="link">{{ text }}</p>
        </el-tooltip>
    </div>
</template>

<script setup lang='ts'>
import { useLanguage } from '@/stores'
const router = useRouter()
const langStore = useLanguage()
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: '可信组织'
    }
})

const text = computed(() => {
    let word: string;
    if (props.type === 'committee') {
        word = langStore.language === 'en' ? 'C' : '委'
    } else if (props.type === 'credibleOrg') {
        word = langStore.language === 'en' ? 'T' : '信'
    } else {
        word = ''
    }
    return word
})

const link = () => {
    router.push({
        name: 'publicityCenter',
        params: {
            tab: '1'
        }
    })
}

</script>

<style scoped lang='scss'>
.stamp-wrapper {
    // #2B60E9 
    // #774AFF 
    width: 20px;
    height: 20px;
    color: #fff;
    // padding: 3px 8px;
    border-radius: 50%;
    font-size: 12px;
    font-family: DINPro-Regular, Ali-Regular;
    display: inline-block;
    line-height: 20px;
    text-align: center;
}
</style>