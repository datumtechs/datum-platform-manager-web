<template>
  <canvas id="cube" ref="cube"></canvas>
</template>

<script>
import createGlobe from 'cobe'
export default {
  components: {},
  props: {},
  data () {
    return {
      globe: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initCube()
  },
  methods: {
    initCube () {
      let phi = 0
      const params = {
        devicePixelRatio: 2,
        width: 400 * 2,
        height: 400 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [ 0.25, 0.51, 0.88 ],
        markerColor: [ 0.1, 0.8, 1 ],
        glowColor: [ 1, 1, 1 ],
        markers: [
          // { location: [ 37.7595, -122.4367 ], size: 0.05 },
          // { location: [ 40.7128, -74.006 ], size: 0.05 }
        ],
        onRender: state => {
          state.phi = phi
          phi += 0.01
        }
      }
      this.globe = createGlobe(this.$refs.cube, params)
    }
  }
}
</script>
<style lang="scss" scoped>
#cube {
  position: absolute;
  width: 400px;
  height: 400px;
  left: 50%;
  top: 50%;
  z-index: 10001;
  transform: translate(-50%, -50%);
}
</style>