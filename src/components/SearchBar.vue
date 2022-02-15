<template>
  <el-input
    v-model="searchText"
    clearable
    :style="{ width: `${width}px` }"
    :placeholder="placeholder"
    prefix-icon="el-icon-search"
  >
  </el-input>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  components: {},
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 480
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {},
  watch: {
    searchText(val) {
      this.sensitive()
    }
  },
  methods: {
    sensitive: debounce(function () {
      this.$emit('searchCb', this.searchText)
    }, 500)
  }
}
</script>

<style lang='scss' scoped>
</style>