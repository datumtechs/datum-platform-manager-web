<template>
  <ul class="day-box">
    <li
      v-for="hot in Array.from({ length: curHot }, (v, k) => k + 1)"
      :key="hot"
      class="day-cell"
      :style="{ height: `${hot * 6}px`, opacity: `${hot * 0.125 + 0.2}` }"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'Activtity',
  props: {
    idleDays: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      totalDays: 6
    }
  },

  computed: {
    curHot () {
      return Math.max(this.totalDays - this.idleDays, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.day-box {
  margin: 0 20px;
  height: 36px;
  width: 59px;
  display: flex;
  align-items: flex-end;
  position: relative;
  top: -10px;
  .day-cell {
    background-color: #00ff5a;
    width: 7px;
    max-height: 36px;
    margin-right: 1px;
  }
}
</style>
