<template>
    <div
    class="w-full h-167px flex relative border-bottom py-34px px-5vw com-main">
     <el-icon  class="cursor-pointer text-48px pt-15px" @click="$router.go(-1)">
          <back />
        </el-icon>
      <div class="black-font ml-21px flex-1">
        <p class="text-22px text-color-[#393939]  font-900 leading-27px">XXXXXX</p>
        <p class="font-medium text-color-[#666666] leading-20px mb-21px mt-9px">{{$t('common.address')}}: XXXXXX</p>
        <div class="font-medium text-color-[#0052D9] leading-20px mt-14px  leading-20px">
          {{$t('credentials.viewExplorer')}}
        </div>
      </div>
      <div class="w-150px">
         <p class="text-color-[#999999]"> {{$t('credentials.circulation')}}</p>
         <p class="text-color-[#393939] font-900 mt-10px">XXXXXX</p>
      </div>
      <div class="flex-1 ml-100px">
         <p class="text-color-[#999999]"> {{$t('credentials.numberHolders')}}</p>
         <p class="text-color-[#393939] font-900 mt-10px">XXXXXX</p>
      </div>
      <div class="w-160px h-42px com-button rounded-21px">
        {{$t('myData.viewData')}}
      </div>
    </div>
    <div class="com-main-data-wrap my-40px">
      <p class="font-900 text-color-[#333333] text-22px">{{$t('credentials.presentPrice')}}</p>
      <p class="text-color-[#666666] font-400 font-medium mt-12px">
        <span>1 LAT = 0.001 MTSTK-618</span>
        <span>1 MTSTK-618 = 999.999 LAT</span>
      </p>
      <div class="w-full h-277px mt-31px mb-20px">chars</div>
      <div class="flex justify-between items-center">
       <div class="flex text-color-[#999999]">
          <div class="mr-50px pb-6px" :class="{'tabs-active': tabsActive == 0}" @click="tabsActive = 0">{{$t('credentials.priceTrend')}}</div>
          <div class="pb-6px" :class="{'tabs-active': tabsActive == 1}" @click="tabsActive = 1">{{$t('credentials.volumeTrend')}}</div>
       </div>
        <div>
          <span>
            15{{$t('common.day')}}
          </span>
            <span>
            30{{$t('common.day')}}
          </span>
            <span>
            6{{$t('common.month')}}
          </span>
            <span>
            1{{$t('common.year')}}
          </span>
            <span>
            {{$t('common.all')}}
          </span>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
const tabsActive = ref(0)

</script>
<style lang="scss" scoped>
.tabs-active{
  font-weight: 500;
  color: #0052D9;
  line-height: 20px;
  border-bottom:2px solid #0052D9;
}
</style>