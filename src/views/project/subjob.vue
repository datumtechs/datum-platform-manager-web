<template>
  <div class="subjob">
    <Table
      :pathName="false"
      @clickBtn="handleBtn"
      :list="list"
      :total="total"
      :btnList="btnList"
      :placeholder="$t('jobs.serach')"
    >
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'
@Component({
  name: 'subjob',
  components: {
    Table,
    JzButton,
  },
})
export default class subjobIndex extends Vue {
  private btnList = [
    {
      lable: 'jobs.pause',
    },
    {
      lable: 'jobs.restart',
      disabled: true,
    },
  ]
  private list = [
    {
      number: 1,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 2,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 3,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 4,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
  ]
  get total() {
    return this.list.length
  }

  private handleBtn() {}
}
</script>

<style scoped lang="stylus">
.subjob
  margin 20px 60px
</style>
