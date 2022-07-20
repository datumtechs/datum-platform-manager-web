<template>
    <div class="flex">
        <div v-if="obj.isAuthority">
            <Stamp :type="'node'" :content="$t('center.committeeMembers')" />
        </div>
        <div v-else-if="obj.isCertified">
            <Stamp :type="'node'" :content="$t('center.credibleOrganization')" />
        </div>
        <div v-else></div>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    obj: {
        type: Object,
        default: () => { }
    }
})
</script>