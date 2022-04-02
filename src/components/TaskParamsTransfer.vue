<template>
  <div class="border-1 border-solid border-color-[#EEEEEE] w-full my-20px">
    <div class="w-full flex items-center py-20px px-30px">
      <div
        class="text-color-[#666666] w-150px mr-11px font-medium"
      >{{ locale == 'zh' ? $t('task.selectData') : `${$t('task.select')} ${props.num}st ${$t('task.selectData')}` }} {{ locale == 'zh' ? props.num : '' }}：</div>
      <!--   <el-select
        v-model="form.sponsorValue"
        :suffix-icon="CaretBottom"
        :placeholder="$t('task.selectSponsor')"
        class="h-40px rounded-20px border-1 w-395px border-solid border-color-[#EEEEEE]"
      >
         <template #prefix>
          <div
            class="w-199px text-color-[#333333] text-14px flex items-center justify-center font-medium h-40px -ml-10px prefix-rounded-left bg-color-[#F7F8F9]"
          >123123</div>
        </template>
       
        <el-option
          v-for="item in sponsorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      -->
      <el-cascader
        class="h-40px rounded-20px border-1 w-395px border-solid border-color-[#EEEEEE]"
        :suffix-icon="CaretBottom"
        v-model="form.sponsorValue"
        :options="props.sponsorOptions"
      />
      <!--
      <el-button round class="h-40px px-24px ml-36px">
        <img :src="ImportIcon" class="h-12px ml-10px" />
        <span class="text-color-[#333333] ml-8px mr-10px">{{ $t('task.importFields') }}</span>
      </el-button>
      -->
    </div>
    <div class="transfer flex h-411px min-w-600px">
      <!--左面-->
      <div class="pl-30px pt-20px flex-1 pr-5px">
        <p class="text-color-[#333333] font-medium">{{ $t('task.fieldTips') }}</p>
        <ul class="fields-main w-full h-330px overflow-auto mt-40px pr-25px">
          <li
            v-show="!item.disabled"
            class="cursor-pointer border-1px border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            v-for="(item, index) in props.fieldsList"
            @click="handFields(item)"
            :key="index"
          >{{ item.name }}</li>
        </ul>
      </div>
      <!--中间-->
      <div class="border-l-r flex-1 pt-20px px-30px">
        <div class="flex mb-30px items-center">
          <span class="inline-block w-100px text-color-[#333333]">{{ $t('task.selectField') }} ：</span>
          <div
            class="flex flex-1 items-center justify-center text-color-[#999999]"
          >{{ activeItem?.name || undefined }}</div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{ $t('task.setTo') }}</span>
          <div
            v-for="item in fieldType"
            :key="item.type"
            @click="fieldTypeActive = item.type"
            class="border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            :class="{ 'com-button': fieldTypeActive == item.type }"
          >{{ $t(`${item.name}`) }}</div>
        </div>
      </div>
      <!--右面-->
      <div class="px-30px pt-20px flex-1">
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{ $t('task.idColumn') }}</span>
          <div
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
          >
            {{ form.idColumn?.name }}
            <el-icon
              v-if="form.idColumn?.name"
              class="absolute right-10px text-19px text-color-[#565656]"
              @click="form.idColumn.disabled = false"
            >
              <remove />
            </el-icon>
          </div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{ $t('task.label') }}</span>
          <div
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
          >
            {{ form.label?.name }}
            <el-icon
              v-if="form.label?.name"
              class="absolute right-10px text-19px text-color-[#565656]"
            >
              <remove />
            </el-icon>
          </div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{ $t('task.feature') }}</span>
          <ul
            class="relative fields-main w-full h-200px overflow-auto px-10px pt-10px border-1px border-solid border-color-[#eeeeee]"
          >
            <li
              class="cursor-pointer border-1px border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
              v-for="(item, index) in form.feature"
              :key="index"
            >
              {{ item.name }}
              <el-icon class="absolute right-20px text-19px text-color-[#565656]">
                <remove />
              </el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CaretBottom, Remove } from '@element-plus/icons-vue'
import ImportIcon from '@/assets/Images/task/importIcon.png'
import type { CascaderOption } from 'element-plus/lib/components/cascader-panel/src/node';
const { locale } = useI18n()
const props = defineProps({
  num: {
    type: Number,
    default: 1
  },
  sponsorOptions: {
    default: (): CascaderOption[] => ([{
      value: '1',
      label: '2',
      children: []
    }])
  },
  fieldsList: {
    type: Object,
    default: () => ([{
      name: '1',
      disabled: false
    }, {
      name: '2',
      disabled: false
    }, {
      name: '3',
      disabled: false
    }, {
      name: '4',
      disabled: false
    }, {
      name: '5',
      disabled: false
    }, {
      name: '6',
      disabled: false
    }, {
      name: '7',
      disabled: false
    }, {
      name: '8',
      disabled: false
    }, {
      name: '9',
      disblate: false
    }])
  }
})



const form = ref<any>({
  sponsorValue: '',
  idColumn: { name: '' },
  label: { name: '' },
  feature: []
})


const fieldTypeActive = ref('idColumn')
const activeItem = ref({ name: '' })



const fieldType = ref([{
  name: "task.idColumn",
  type: "idColumn"
}, {
  name: "task.label",
  type: "label"
}, {
  name: "task.feature",
  type: "feature"
}])


const handFields = (item: any) => {
  item.disabled = true
  activeItem.value = item
  switch (fieldTypeActive.value) {
    case 'idColumn':
      form.value.idColumn = item; break;
    case 'label':
      form.value.label = item; break;
    case 'feature':
      //@ts-ignore
      form.value.feature?.push(item); break;
    default:
      console.log("错误")
      break;
  }
}





</script>
<style lang="scss" scoped>
.prefix-rounded-left {
  border-radius: 20px 0 0 20px;
  border-bottom: 1px solid #eeeeee;
}
.transfer {
  border-top: 1px solid #eeeeee;
}
.border-l-r {
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}

.fields-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
}
.fields-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  height: 30px;
  border-radius: 10px;
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d8d8d8;
}
.fields-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
</style>