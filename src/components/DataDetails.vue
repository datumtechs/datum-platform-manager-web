<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :back-show="true" :bg-name="'market'" @back="router.go(-1)" :detailName="dataName"
      :showRouter="false">
      <template #select>
        <ComTabs :keep="false" :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <BaseInfo v-if="activekey == 0" :tableData="tableData" />
      <MetaData v-if="activekey == 1" :data="MetadataData" />
      <TaskInvolved v-if="activekey == 2" :metaDataId="metaDataId" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useUsersInfo } from '@/stores'
import { useFileType, useFormatTime } from '@/hooks'
import { queryDataDetails } from '@/api/data'
import { enums } from '@/utils/enum'

export default defineComponent({
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (from.name === 'marketplace') {
        next()
      } else {
        if (!vm.store.token) {
          vm.router.push({ name: 'marketplace' })
        }
        if (vm.store.token && !vm.metaDataId) {
          return vm.router.go(-1)
        }
      }

    })
  },
  setup() {
    const { t } = useI18n()
    const router: any = useRouter()
    const store: any = useUsersInfo()
    const route: any = useRoute()
    const activekey: any = ref(0)
    const metaDataId: string | any = route.query.metaDataId || ''
    const dataName: string | any = route.query.dataName

    const list = ref([
      {
        name: 'myData.basicInfo'
      },
      {
        name: 'myData.metadata'
      },
      {
        name: 'myData.tasksInvolved'
      }
    ])

    const MetadataData = ref([{
      remarks: "myData"
    }])

    const tableData = ref<any[]>([])
    const tabsChange = (index: string) => {
      activekey.value = +index
    }

    const query = () => {
      queryDataDetails({ metaDataId: metaDataId }).then(res => {
        const { data, code } = res
        if (code == 10000) {
          tableData.value = [{
            lName: 'myData.dataName',
            lProp: data.metaDataName,
            // rName: 'myData.credentialSymbol',
            // rProp: data.tokenSymbol,
            rName: 'myData.industryData',
            rProp: t(enums.industry[data.industry])// data.industry,
          }, {
            lName: 'myData.launchTime',
            lProp: useFormatTime(data.publishedAt),
            rName: 'myData.dataSize',
            rProp: data.size,

          }, {
            lName: 'myData.dataFormat',
            lProp: useFileType(data.fileType),
            rName: 'myData.columnsData',
            rProp: data.columns,
          }, {
            lName: 'myData.rowsData',
            lProp: data.rows,
            rName: 'myData.dataDescription',
            rProp: data.remarks,
          }]
          MetadataData.value = data.columnsList
        }
      })
    }

    onMounted(() => {
      query()
    })

    return {
      tabsChange,
      list,
      activekey,
      tableData,
      MetadataData,
      metaDataId,
      dataName,
      router,
      store
    }
  }
})

</script>
<style lang="scss" scoped>
</style>