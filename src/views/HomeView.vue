<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const number = ref(0)
const coachAnqeloti = ref('安切洛蒂')
const coachMarrioObj = reactive({
  name: '穆里尼奥',
  number: 1
})
const add = () => number.value++
const add2 = () => coachMarrioObj.number++
const showMoney = (money: string) => {
  console.log('money', money)
}
onMounted(() => {
  console.log('mounted!')
})
</script>

<template>
  <div>
    <HeadBar />
    <!-- <HeadBar name="bingdundun" @showMoney="showMoney" /> -->
    <!-- <div class="welcome">welcome to moirae 4</div>
    <div class="welcome">{{ coachAnqeloti }} 获得过 {{ number }} 欧洲冠军</div>
    <div class="welcome">{{ coachMarrioObj.name }} 获得过 {{ coachMarrioObj.number }} 欧洲冠军</div>
    <button @click="add">add1</button>
    <button @click="add2">add2</button> -->
  </div>
</template>

<style lang="scss">
.welcome {
  font-size: 32px;
  color: red;
}
</style>
