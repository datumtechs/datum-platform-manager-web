<template>
  <div class="data-wrap">
    <div class="title">
      {{ $t('route.resources') }}
    </div>
    <div class="blick">
      <jz-nav :tabs="tabs" :tabIndex="tabIndex"></jz-nav>
      <Table
        @clickName="handleName"
        @clickBtn="handleBtn"
        :list="list"
        :total="total"
        :btnList="btnList"
        :placeholder="$t('home.searchdata')"
      >
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '../project/components/Table.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'

@Component({
  name: 'resourcesData',
  components: {
    JzButton,
    Table,
    JzNav,
  },
})
export default class resourcesData extends Vue {
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
  private tabs: string[] = ['data']
  private tabIndex = 0
  private btnList = [
    {
      lable: 'worke.edit',
    },
  ]
  get total() {
    return this.list.length
  }
  private handleName(id: number) {
    this.$router.push('/resources/detail/' + id)
  }
  private handleBtn() {}
}
</script>

<style scoped lang="stylus">
.data-wrap
  margin: 20px 0 0 65px;
  .title
    margin-bottom 50px
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
</style>
