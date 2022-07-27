<template>
    <div class="task-wrap com-main">
        <Banner :bg-name="'publicCenter'">
            <template #select>
                <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </template>
        </Banner>
        <TrustedOrg v-if="activekey === 0" />
        <Committee v-else-if="activekey === 1" />
        <Proposal v-else />
    </div>
</template>

<script setup lang='ts'>
import TrustedOrg from './components/TrustedOrg.vue'
import Committee from './components/Committee.vue'
import Proposal from './components/Proposal.vue'
const route = useRoute()
const activekey = ref(0)
const list = ref([
    {
        name: 'node.credibleOrganization'
    },
    {
        name: 'center.committeeMembers'
    },
    {
        name: 'center.committeeProposal'
    }

])
const tabsChange = (index: string) => {
    activekey.value = +index
}

const tabIndex = computed(() =>
    route.params.tab || 0
)
console.log('tabIndex', tabIndex.value);

watch(() => tabIndex.value, (newV, oldV) => {
    console.log('tabIndex in watch', tabIndex.value);
    activekey.value = +tabIndex.value
})


onMounted(() => {
    console.log('tabIndex', tabIndex.value);
    activekey.value = +tabIndex.value
})

</script>

<style scoped lang='scss'>
</style>