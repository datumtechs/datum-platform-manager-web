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
import qs from 'qs'
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
      matched.splice(1, 0, {
        path: '/home/data',
        meta: { title: 'dataDetail' },
      } as RouteRecord)
    }
    if (this.isAlgorithmDetail(last)) {
      matched.splice(1, 0, {
        path: '/home/algorithm',
        meta: { title: 'algorithmDetail' },
      } as RouteRecord)
    }
    if (this.isResourcesData(last)) {
      matched.splice(1, 0, {
        path: '/resources/data',
        meta: { title: 'data' },
      } as RouteRecord)
    }
    if (this.isWorkflow(last)) {
      const query = qs.stringify(this.$route.query)
      matched.splice(2, 0, {
        path: `/project/work?${query}`,
        meta: { title: 'work' },
      } as RouteRecord)
    }
    if (this.isSubjob(last)) {
      const query = qs.stringify(this.$route.query)
      matched.splice(2, 0, {
        path: `/project/jobs?${query}`,
        meta: { title: 'jobs' },
      } as RouteRecord)
    }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
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
    const { redirect, path } = item
    const query = qs.stringify(this.$route.query)
    if (redirect) {
      try {
        let redirects = ''
        if (item.meta.title === 'project') {
          redirects = redirect + '?' + query
        } else {
          redirects = redirect
        }
        this.$router.push(redirects)
      } catch (error) {
        console.warn(error)
      }
      return
    }
    try {
      this.$router.push(path)
    } catch (error) {
      console.warn(error)
    }
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
