<template>
  <div class="index-wrapper">
    <HeadBar />
    <section class="index-twins-box">
      <div class="index-menu-box"></div>
      <div class="index-main-box">
        This is the Index
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="false"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, onMounted } from 'vue'
const currentPage4 = ref(4)
const pageSize4 = ref(100)
</script>

<style scoped lang="scss">
.index-wrapper {
  .index-twins-box {
    display: flex;
    height: calc(100vh - 70px);
    .index-menu-box {
      width: 220px;
      background: #ffffff;
      box-shadow: inset -1px 0px 0px 0px rgba(238, 238, 238, 0.5);
    }
    .index-main-box {
      flex: 1;
    }
  }
}
</style>
