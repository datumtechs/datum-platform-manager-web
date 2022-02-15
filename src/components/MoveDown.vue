<template>
  <div class="move-down-box" @click="linkTo">
    <img src="~assets/images/home/1.icon1.svg" alt="" class="move-down-img pointer" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  inject: ['slideFn'],
  data() {
    return {
      index: 0
    }
  },
  computed: {
    ...mapGetters('app', ['curPageIndex'])
  },
  methods: {
    ...mapMutations('app', ['SET_CURPAGEINDEX']),
    linkTo() {
      const screenHeight = document.body.clientHeight
      this.index = this.curPageIndex
      this.index++
      this.slideFn(screenHeight, this.index) // slideFn(unit, index) {
      this.SET_CURPAGEINDEX(this.index)
    }
  }
}
</script>
<style lang="scss" scoped>
.move-down-box {
  position: absolute;
  bottom: 0.5rem;
  left: 6.1%;
  z-index: 10001;
  @media screen and (min-width: 1920px) {
    left: 10%;
  }
}
</style>
