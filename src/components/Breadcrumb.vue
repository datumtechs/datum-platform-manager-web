<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
        >
          {{
            item.meta.dynamic
              ? BreadcrumbModule[item.meta.title]
              : $t('route.' + item.meta.title)
          }}
        </span>
        <!-- 点击跳转 -->
        <a v-else @click.prevent="handleLink(item)">
          {{
            item.meta.dynamic
              ? BreadcrumbModule[item.meta.title]
              : $t('route.' + item.meta.title)
          }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'

@Component({
  name: 'Breadcrumb',
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = []
  get BreadcrumbModule() {
    return BreadcrumbModule
  }
  @Watch('$route')
  private onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    let matched = this.$route.matched.filter(
      (item) => item.meta && item.meta.title,
    )

    // 判断申请授权页面，添加父级标签
    const last = matched[matched.length - 1]
    if (this.isAuthorize(last) || this.isDataDetail(last)) {
      const id = this.$route.params.id
      matched.splice(1, 0, {
        path: '/home/data',
        meta: { title: 'dataDetail' },
      } as RouteRecord)
    }
    if (this.isAlgorithmDetail(last)) {
      const id = this.$route.params.id
      matched.splice(1, 0, {
        path: '/home/data',
        meta: { title: 'algorithmDetail' },
      } as RouteRecord)
    }
    if (this.isResourcesData(last)) {
      const id = this.$route.params.id
      matched.splice(1, 0, {
        path: '/resources/data',
        meta: { title: 'data' },
      } as RouteRecord)
    }
    if (this.isWorkflow(last)) {
      const id = this.$route.params.id
      matched.splice(2, 0, {
        path: `/project/${id}`,
        meta: { title: 'work' },
      } as RouteRecord)
    }
    if (this.isSubjob(last)) {
      const id = this.$route.params.id
      matched.splice(2, 0, {
        path: `/project/${id}/jobs`,
        meta: { title: 'jobs' },
      } as RouteRecord)
    }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
    console.log('breadcrumbs', this.breadcrumbs)
  }

  private isAuthorize(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Authorize'.toLocaleLowerCase()
  }
  private isDataDetail(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'dataDetail'.toLocaleLowerCase()
  }
  private isAlgorithmDetail(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return (
      name.trim().toLocaleLowerCase() === 'algorithmDetail'.toLocaleLowerCase()
    )
  }
  private isResourcesData(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return (
      name.trim().toLocaleLowerCase() === 'resourcesData'.toLocaleLowerCase()
    )
  }
  private isWorkflow(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'workflow'.toLocaleLowerCase()
  }
  private isSubjob(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'subjob'.toLocaleLowerCase()
  }

  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = compile(path)
    return toPath(params)
  }

  private handleLink(item: any) {
    console.log('item', item)
    const { redirect, path } = item

    if (redirect) {
      try {
        // :id,:workflows,:subjob 转换为id
        let redirects = ''
        if (item.meta.title === 'project') {
          const name = this.$route.query.name
          redirects = redirect + '?name=' + name
          console.log('paths', redirects)
        } else {
          redirects = path
          console.log('paths', redirects)
        }
        const res = this.handlePath(redirects)
        this.$router.push(res)
      } catch (error) {
        console.warn(error)
      }
      return
    }
    try {
      const res = this.handlePath(path)
      this.$router.push(this.pathCompile(res))
    } catch (error) {
      console.warn(error)
    }
  }
  // 处理动态路径
  private handlePath(path: string) {
    let res: string = path
    if (res.indexOf(':id') > -1) {
      const id = this.$route.params.id
      res = res.replace(/:id/g, id)
    }
    if (res.indexOf(':workflow') > -1) {
      const workflow = this.$route.params.workflow
      res = res.replace(/:workflow/g, workflow)
    }
    if (res.indexOf(':subjob') > -1) {
      const subjob = this.$route.params.subjob
      res = res.replace(/:subjob/g, subjob)
    }
    return res
  }
}
</script>

<style lang="stylus" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
  color #5f4ffb;
}
.el-breadcrumb__inner a:hover
  text-decoration: underline
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #161616;
    cursor: text;
  }
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
/* breadcrumb transition */
.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
