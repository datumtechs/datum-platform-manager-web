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
import Table from '@/components/JzTable.vue'
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
  ]
  get total() {
    return this.list.length
  }

  private handleBtn() {}
}
</script>

<style scoped lang="stylus">
.subjob
  padding 30px
  background #fff
  box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
</style>
