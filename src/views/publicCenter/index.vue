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
</script>

<style scoped lang='scss'>
</style>