<template>
  <div class="w-full h-167px flex relative border-bottom py-34px px-5vw com-main">
    <el-icon class="cursor-pointer text-48px pt-15px" @click="$router.go(-1)">
      <back />
    </el-icon>
    <div class="black-font ml-21px flex-1">
      <p class="text-22px text-color-[#393939] font-900 leading-27px">XXXXXX</p>
      <p
        class="black-font text-color-[#666666] leading-20px mb-21px mt-9px"
      >{{ $t('common.address') }}: XXXXXX</p>
      <div
        class="black-font text-color-[#0052D9] leading-20px mt-14px leading-20px"
      >{{ $t('credentials.viewExplorer') }}</div>
    </div>
    <div class="w-150px">
      <p class="text-color-[#999999]">{{ $t('credentials.circulation') }}</p>
      <p class="text-color-[#393939] font-900 mt-10px">XXXXXX</p>
    </div>
    <div class="flex-1 ml-100px">
      <p class="text-color-[#999999]">{{ $t('credentials.numberHolders') }}</p>
      <p class="text-color-[#393939] font-900 mt-10px">XXXXXX</p>
    </div>
    <div class="w-160px h-42px com-button rounded-21px black-font">{{ $t('myData.viewData') }}</div>
  </div>
  <div class="com-main-data-wrap my-40px">
    <div class="flex items-center justify-between">
      <div>
        <p
          class="font-900 text-color-[#333333] text-22px black-font"
        >{{ $t('credentials.presentPrice') }}</p>
        <p class="text-color-[#666666] font-400 font-medium mt-12px">
          <span>1 LAT = 0.001 MTSTK-618</span>
          <span>1 MTSTK-618 = 999.999 LAT</span>
        </p>
      </div>
      <div class="w-160px h-42px com-button rounded-21px font-medium">{{ $t('myData.purchase') }}</div>
    </div>
    <div class="w-full h-277px mt-31px mb-20px">
      <DataCharts :key="'purchase'" />
    </div>
    <div class="flex justify-between items-center">
      <div class="flex text-color-[#999999]">
        <div
          :class="{ 'tabs-active': tabsActive == 0 }"
          class="tabs-bottom mr-50px pb-6px"
          @click="tabsActive = 0"
        >{{ $t('credentials.priceTrend') }}</div>
        <div
          :class="{ 'tabs-active': tabsActive == 1 }"
          class="tabs-bottom pb-6px"
          @click="tabsActive = 1"
        >{{ $t('credentials.volumeTrend') }}</div>
      </div>
      <div>
        <span
          class="mr-20px border-0px"
          :class="{ 'tabs-active': dateActive == 0 }"
          @click="dateActive = 0"
        >15{{ $t('common.day') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 1 }"
          @click="dateActive = 1"
        >30{{ $t('common.day') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 2 }"
          @click="dateActive = 2"
        >6{{ $t('common.month') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 3 }"
          @click="dateActive = 3"
        >1{{ $t('common.year') }}</span>
        <span
          class="mr-10px"
          :class="{ 'tabs-active': dateActive == 4 }"
          @click="dateActive = 4"
        >{{ $t('common.all') }}</span>
      </div>
    </div>
  </div>
  <div class="com-main-data-wrap my-40px">
    <p
      class="font-900 text-color-[#333333] text-22px black-font"
    >{{ $t('credentials.credentialExchangePool') }}</p>
    <div class="flex items-center justify-between mt-19px">
      <div>
        <p class="font-900 text-color-[#333333] black-font">{{ $t('myData.total') }}</p>
        <p class="text-color-[#666666] font-400 font-medium mt-6px">
          <span class="mr-40px">12,333 MTSTK-618</span>
          <span>999,999 LAT</span>
        </p>
      </div>
      <div>
        <p class="font-900 text-color-[#333333] black-font">
          {{ $t('myData.myShare') }}：
          <span class="text-color-[#666666]">23%</span>
        </p>
        <p class="text-color-[#666666] font-400 font-medium mt-6px">
          <span class="mr-40px">12,333 MTSTK-618</span>
          <span>999,999 LAT</span>
        </p>
      </div>
    </div>
    <div class="w-full h-277px mt-31px mb-20px">
      <div class="py-40px" :ref="e => container = e"></div>
    </div>
    <div class="flex justify-between items-center pb-50px">
      <div></div>
      <div>
        <span
          class="mr-20px border-0px"
          :class="{ 'tabs-active': dateActive == 0 }"
          @click="dateActive = 0"
        >15{{ $t('common.day') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 1 }"
          @click="dateActive = 1"
        >30{{ $t('common.day') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 2 }"
          @click="dateActive = 2"
        >6{{ $t('common.month') }}</span>
        <span
          class="mr-20px"
          :class="{ 'tabs-active': dateActive == 3 }"
          @click="dateActive = 3"
        >1{{ $t('common.year') }}</span>
        <span
          class="mr-10px"
          :class="{ 'tabs-active': dateActive == 4 }"
          @click="dateActive = 4"
        >{{ $t('common.all') }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import DataCharts from './DataCharts.vue'
import { Chart } from '@antv/g2';
const tabsActive = ref(0)
const dateActive = ref(0)
const container = ref()
watch(dateActive, () => {
  dateChange()
})

watch(tabsActive, () => {
  tabsChange()
})

const dateChange = () => { }
const tabsChange = () => { }
const query = () => {
  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/nintendo.json')
    .then(res => res.json())
    .then(data => {
      const chart = new Chart({
        container: container.value,
        autoFit: true,
        height: 230,
      });
      chart.data(data);
      chart.scale({
        Date: {
          tickCount: 100
        },
        Close: {
          nice: true,
        }
      });
      chart.axis('Date', {
        label: {
          formatter: text => {
            const dataStrings = text.split('.');
            return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0];
          }
        }
      });

      chart.line().position('Date*Close');

      chart.render();
    });
}
onMounted(() => {
  query()
})

</script>
<style lang="scss" scoped>
.tabs-bottom {
  line-height: 20px;
  font-weight: 500;
  border-bottom: 2px solid #ffffff;
}
.tabs-active {
  color: #0052d9;
  border-color: #0052d9;
}
</style>