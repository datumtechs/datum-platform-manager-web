<script lang="ts" setup>
import { queryOrgDetail } from '@/api/node'
import { useSize,usedBandwidth } from '@/hooks'
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const nodeInfo: any = reactive({
  nodeName: '',
  imageUrl: '',
  orgTotalCore: '',
  orgTotalMemory: '',
  orgTotalBandwidth: '',
})

const pageObj = reactive({
  current: 1,
  size: 10,
  total: 0
})

const activekey = ref(0)
const list = reactive([
  {
    name: 'common.data'
  },
  {
    name: 'common.computations'
  }
])

const identityId = computed((): any =>
  route.params.identityId
)



const getDetail = async () => {
  const { code, data } = await queryOrgDetail({
    identityId: identityId.value,
  })
  if (code === 10000) {
    nodeInfo.nodeName = data.nodeName
    nodeInfo.imageUrl = data.imageUrl
    nodeInfo.orgTotalCore = data.orgTotalCore
    nodeInfo.orgTotalMemory = data.orgTotalMemory
    nodeInfo.orgTotalBandwidth = data.orgTotalBandwidth
  }
}

onMounted(() => {
  getDetail()
})

</script>
<template>
  <div class="flex-1 h-full relative">
    <DetailBanner :backShow="true" @back="router.go(-1)" :imgUrl="nodeInfo.imageUrl">
      <template #primaryInfo>{{ nodeInfo.nodeName }}</template>
      <template #briefInfo>Identifier：{{ identityId }}</template>
      <template #machineInfo class="flex">
        <div class="flex text-center">
          <div class="flex flex-col w-160px relative borderR">
            <p class="text-14px text-color-[#999999] leading-20px">{{ t('node.totalCpu') }}</p>
            <p class="text-14px text-color-[#333] mt-4px font-bold">{{
              nodeInfo.orgTotalCore
            }}&nbsp;{{ t('common.cores') }}</p>
          </div>
          <div class="flex flex-col w-160px relative borderR">
            <p class="text-14px text-color-[#999999] leading-20px">{{ t('node.totalMemory') }}</p>
            <p class="text-14px text-color-[#333] mt-4px font-bold">{{
              useSize(nodeInfo.orgTotalMemory)
            }}</p>
          </div>
          <div class="flex flex-col w-160px">
            <p class="text-14px text-color-[#999999] leading-20px">{{ t('node.totalBandwidth') }}
            </p>
            <p class="text-14px text-color-[#333] mt-4px font-bold">{{
              usedBandwidth(nodeInfo.orgTotalBandwidth) + 'ps'
            }}</p>
          </div>
        </div>
      </template>
    </DetailBanner>
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.borderR:after {
  content: "";
  height: 48px;
  width: 1px;
  background: #eee;
  position: absolute;
  right: 0;
}
</style>