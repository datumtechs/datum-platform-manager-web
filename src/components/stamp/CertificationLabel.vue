<template>
    <div class="flex">
        <div v-if="obj.isAuthority" class="pr-10px">
            <Stamp :type="'committee'" :content="$t('center.committeeMembers')" />
        </div>
        <div v-else-if="obj.isCertified" class="pr-10px">
            <Stamp :type="'credibleOrg'" :content="$t('node.credibleOrganization')" />
        </div>
        <div v-else class="w-20px h-20px mr-10px"></div>
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