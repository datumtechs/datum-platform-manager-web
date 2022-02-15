<template>
  <div class="bread-wrapper">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breads" :key="item.path">
          <span v-if="index === breads.length - 1">
            {{ $t(`${item.meta.breadcrumbs}`) }}
            {{ curName ? ' - ' + curName : '' }}
          </span>
          <span v-else class="link-btn pointer" @click="linkWithPath(item, index)">
            {{ $t(`${item.meta.breadcrumbs}`) }}
          </span>
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if="curName">{{ curName }}</el-breadcrumb-item> -->
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    curName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      breads: [],
      curBeardName: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.breads = this.getBreadcrumbs(this.$route.matched)
  },
  methods: {
    getBreadcrumbs() {
      const matched = this.$route.matched
      return matched.filter(m => m.name !== 'layout' && m.meta.breadcrumbs)
    },
    // handlePath (path) {
    //   let res = path
    //   if (res.indexOf(':id') > -1) {
    //     const id = this.$route.params.id
    //     res = res.replace(/:id/g, id)
    //   }
    //   if (res.indexOf(':name') > -1) {
    //     const name = this.$route.params.name
    //     res = res.replace(/:name/g, name)
    //   }
    //   return res
    // },
    linkWithPath(item) {
      if (item.name === 'projectCenter') {
        this.$router.go(-1)
        // this.$router.push({
        //   name: 'projectCenter',
        //   query: {
        //     id: this.$route.query.projectId,
        //     name: this.$route.query.name
        //   }
        // })
      } else {
        this.$router.push({
          name: item.name
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.bread-wrapper {
  width: 100%;
  height: 36px;
  padding: 12px 16px;
  font-size: 12px;
  color: #333333;
  line-height: 12px;
  font-weight: 400;
  border-bottom: 1px solid #ebeef9;
  box-shadow: 0px 1px 0px 0px rgba(235, 238, 249, 1);
  .el-breadcrumb__item {
    height: 12px;
    font-size: 12px;
    color: #646464;
    line-height: 12px;
    &:last-child {
      font-family: DINPro-Medium, Ali-Medium;
      color: #333333;
    }
  }
  // .el-breadcrumb__item:last-child {
  //   height: 12px;
  //   font-family: DINPro-Medium, Ali-Medium;
  //   font-size: 12px;
  //   color: #333333;
  //   line-height: 12px;
  // }
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }
  /* breadcrumb transition */
  .breadcrumb-move {
    transition: all 0.5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
}
</style>