<template>
    <div class="task-wrap com-main">
        <Banner :bg-name="'publicCenter'">
            <template #select>
                <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </template>
        </Banner>
        <TrustedOrg v-if="activekey === 0" />
        <Proposal v-else-if="activekey === 1" />
        <Committee v-else />
    </div>
</template>

<script setup lang='ts'>
import TrustedOrg from './components/TrustedOrg.vue'
import Committee from './components/Committee.vue'
import Proposal from './components/Proposal.vue'
const activekey = ref(0)
const list = ref([
    {
        name: 'node.credibleOrganization'
    },
    {
        name: 'center.committeeProposal'
    },
    {
        name: 'center.committeeMembers'
    }
])
const tabsChange = (index: string) => {
    activekey.value = +index
}
</script>

<style scoped lang='scss'>
</style>