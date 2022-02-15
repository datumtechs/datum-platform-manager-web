<template>
  <div class="waves"></div>
</template>

<script>
import waves from '/public/js/newWaves'
export default {
  components: {},
  data() {
    return {
      waveCase: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    waves.waves()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.waves {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
