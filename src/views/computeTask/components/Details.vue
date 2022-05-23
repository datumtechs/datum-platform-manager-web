<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :back-show="true" :bg-name="'clocksWatches'" @back="router.go(-1)">
      <template #select>
        <ComTabs :keep="false" :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap mt-63px">
      <BaseInfo v-if="activekey === 0" :tableData="baseData" type="task" />
      <PartyInfo v-if="activekey === 1" :taskSponsor="taskSponsor" :resultConsumer="resultConsumer"
        :dataProvider="dataProvider" :powerProvider="powerProvider" />
      <TaskEvents v-if="activekey === 2" :data="eventList" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseInfo from '@/components/dataComponents/BaseInfo.vue'
import PartyInfo from '@/components/commonTable/PartyInfo.vue'
import TaskEvents from '@/components/TaskEvents.vue'
import { queryTaskDetails } from '@/api/task'
import { useDuring, useFormatTime, useSize } from '@/hooks'

const router = useRouter()
const route = useRoute()
const taskId = computed(() => route.query.taskId)
const activekey = ref(0)
const list = reactive([
  {
    name: 'myData.basicInfo'
  },
  {
    name: 'common.partyInfo'
  },
  {
    name: 'computeTask.taskEvents'
  }
])

const baseData = reactive([{
  lName: 'task.taskName',
  lProp: "",
  rName: 'computeTask.taskStartTime',
  rProp: "",
}, {
  lName: 'computeTask.computingStartTime',
  lProp: "",
  rName: 'computeTask.taskEndTime',
  rProp: "",
}, {
  lName: 'computeTask.totalTime',
  lProp: "",
  rName: 'computeTask.taskResult',
  rProp: "",
}, {
  lName: 'computeTask.declaredComputingPowerRequired',
  lProp: {
    cpu: {
      label: 'common.cpu',
      value: ''
    },
    memory: {
      label: 'common.memory',
      value: ''
    },
    bandWidth: {
      label: 'common.bandwidth',
      value: ''
    },
  },
  last: true
}])

const tabsChange = (index: string) => {
  console.log(index);
  activekey.value = +index
}

const taskSponsor: any = ref([])
const eventList = ref([])
const resultConsumer = ref([])
const dataProvider = ref([])
const powerProvider = ref([])

const getTaskDetail = async () => {
  const { code, data } = await queryTaskDetails({
    taskId: taskId.value,
  })
  if (code === 10000) {
    baseData[0].lProp = data.taskName
    baseData[0].rProp = useFormatTime(data.createAt) + ''

    baseData[1].lProp = useFormatTime(data.startAt) + ''
    baseData[1].rProp = useFormatTime(data.endAt) + ''

    baseData[2].lProp = useDuring(data.endAt - data.startAt)
    baseData[2].rProp = data.status

    baseData[3].lProp['cpu'].value = data.requiredCore
    baseData[3].lProp['memory'].value = useSize(data.requiredMemory)
    baseData[3].lProp['bandWidth'].value = useSize(data.requiredBandwidth) + 'P/S'

    eventList.value = data.eventList

    taskSponsor.value = new Array(data.sponsor)
    resultConsumer.value = data.resultReceiverList
    dataProvider.value = data.dataProviderList
    powerProvider.value = data.powerProviderList
  }
}

onMounted(() => {
  getTaskDetail()
})

</script>
<style lang="scss" scoped>
</style>
