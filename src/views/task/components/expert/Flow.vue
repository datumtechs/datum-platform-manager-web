<template>
    <div class="flex-1 py-20px px-30px">
        <div class="btn-group">
            <el-button type="primary" v-for="item in btnList" round>{{ item.label }}</el-button>
        </div>
        <div id="mainStage" class="mainStage" :class="{ showDot: showDot }"></div>
    </div>
</template>

<script setup lang='ts'>
const dragStatus = ref<boolean>(true)
const { t } = useI18n()
let showDot = ref<boolean>(true)
const btnList = computed(() => [
    {
        id: 1,
        value: 'save',
        label: t('common.save')
    },
    {
        id: 2,
        value: 'delete',
        label: t('common.viewEvent')
    }
])
watch([dragStatus], ([val]) => showDot.value = val, { immediate: true })

</script>

<style scoped lang='scss'>
.mainStage {
    width: 260px;
    height: calc(100% - 90px);
    margin: 30px auto;
    text-align: center;
    &.showDot {
        border: 1px dashed #d3d2d2;
        box-shadow: 0 0 1px;
    }
}
</style>