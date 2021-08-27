<template>
  <div class="header">
    <el-row class="header-layout">
      <el-col :span="18" class="left-loyout">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#000"
          text-color="#C6C6C6"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="RosettaFlow">
            <template slot="title">RosettaFlow</template>
            <el-menu-item>RosettaNet</el-menu-item>
            <el-menu-item>RosettaFlow</el-menu-item>
            <el-menu-item>RosettaMAS</el-menu-item>
          </el-submenu>
          <el-menu-item index="/home">{{ $t('nav.market') }}</el-menu-item>
          <el-menu-item index="/case/index">
            {{ $t('nav.case') }}
          </el-menu-item>
          <el-submenu index="project">
            <template slot="title">
              {{ $t('nav.project') }}
            </template>
            <el-menu-item index="/project/all">
              {{ $t('nav.all') }}
            </el-menu-item>
            <el-menu-item
              :index="item.index"
              v-for="(item, index) in allProject"
              :key="index"
            >
              {{ $t(`allProject.${index + 1}`) }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <div class="right right-layout">
          <span class="language" @click="changeLanguage">{{
            isEnglish ? 'EN' : '中文'
          }}</span>
          <!-- 我的资源 -->
          <span @click="handleLoggedData" class="logged-data-item">
            <img
              v-show="!isLoggedData"
              class="logged-data"
              src="@/assets/images/icons/logged-data.svg"
            />
            <img
              v-show="isLoggedData"
              class="icon-close"
              src="@/assets/images/icons/close.svg"
            />
          </span>
          <!-- 我的账户 -->
          <span class="user" @click="handleUser">{{ userName }}</span>
          <span @click="handleUser" class="user-item">
            <img
              v-show="!isUserShow"
              class="icon-user"
              src="@/assets/images/icons/user.svg"
            />
            <img
              v-show="isUserShow"
              class="icon-close"
              src="@/assets/images/icons/close.svg"
            />
          </span>
        </div>
      </el-col>
    </el-row>
    <transition name="drawer-fade">
      <RightDrawer
        v-if="isUserShow || isLoggedData"
        :historyIndex="historyIndex"
        @clickItem="handeleClose"
        ref="RightDrawer"
      ></RightDrawer>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'
import { getLocale } from '@/lang'

import RightDrawer from './Drawer.vue'
@Component({
  components: {
    RightDrawer,
  },
})
export default class HeaderComponent extends Vue {
  public isEnglish: boolean = false
  public userName = UserModule.user_info.user_name
  public isUserShow: boolean = false
  public isLoggedData: boolean = false
  public historyIndex: number[] = []

  public allProject = [
    {
      index: '/project/1',
    },
    {
      index: '/project/2',
    },
    {
      index: '/project/3',
    },
  ]
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  public handleUser() {
    this.isUserShow = !this.isUserShow
    if (this.isUserShow) {
      this.historyIndex.push(1)
    } else {
      // 关闭时候删除该下标
      this.historyIndex.splice(
        this.historyIndex.findIndex((e) => e === 1),
        1,
      )
    }
  }
  // 点击切换资源
  public handleLoggedData() {
    this.isLoggedData = !this.isLoggedData
    if (this.isLoggedData) {
      this.historyIndex.push(0)
    } else {
      this.historyIndex.splice(
        this.historyIndex.findIndex((e) => e === 0),
        1,
      )
    }
  }
  public handleSelect(key: string, keyPath: string) {
    // console.log(key, keyPath)
  }

  private handeleClose() {
    this.isUserShow = false
    this.isLoggedData = false
    this.historyIndex = []
  }
  public changeLanguage() {
    this.isEnglish = !this.isEnglish
    const lang = this.isEnglish ? 'en' : 'zh'
    AppModule.SetLanguage(lang)
    this.$i18n.locale = lang
  }
  public created() {
    const lang = getLocale()
    this.isEnglish = lang === 'en'
  }
}
</script>

<style scoped lang="stylus">
.header {
  padding: 0px 24px;
  background #000
  position relative
  .header-layout {
    font-size: 18px;
    color: #fff;
    font-weight: 500;
  }

  .left-loyout {
    .el-menu-item:hover{
      outline: 0 !important;
      color: #fff !important;
      background #545c64 !important;
    }
    >>> .el-submenu:not(.is-active):hover .el-submenu__title{
      background: #545c64 !important;
      color: #fff !important;
    }
    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }
  }
  .right-layout {
    font-size: 16px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    span {
      padding 0 18px
      display inline-block
      line-height 60px
      cursor pointer
      .icon-user{
        vertical-align: -4px;
      }
      .logged-data {
        vertical-align: -4px;
      }
      .icon-close{
        vertical-align: 0px
        padding 0 3px
      }
    }
    .user-item, .logged-data-item{
      width 56px
      box-sizing: border-box;
    }
    span:not(.user,.language):hover {
      background: #545c64
    }
  }
  .drawer-fade-enter-active {
    transition: all .5s ease;
  }
  .drawer-fade-leave-active {
    transition: all .5s ease;
  }
  .drawer-fade-enter, .drawer-fade-leave-to{
    transform: translateX(300px);
    opacity: 0;
  }
}
.el-menu--horizontal .el-menu--popup .el-menu-item:hover{
  background: #545c64 !important;
}
</style>
