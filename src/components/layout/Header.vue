<template>
  <div class="header">
    <el-row class="header-layout">
      <el-col :span="18" class="left-loyout">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="#000"
          active-text-color="#5F4FFB"
          :router="true"
        >
          <el-menu-item index="/" class="logo-wrap">
            <svg-icon
              name="logo"
              width="100"
              height="35"
              class="logo-svg"
              color="#5F4FFB"
            />
          </el-menu-item>
          <!-- <el-submenu index="/" class="logo-wrap">
            <template slot="title">
              <svg-icon
                name="logo"
                width="100"
                height="35"
                class="logo-svg"
                color="#5F4FFB"
              />
            </template>
            <el-menu-item>RosettaNet</el-menu-item>
            <el-menu-item>RosettaFlow</el-menu-item>
            <el-menu-item>RosettaMAS</el-menu-item>
          </el-submenu> -->
          <el-submenu index="home">
            <template slot="title">
              {{ $t('nav.market') }}
            </template>
            <el-menu-item index="/home/data">
              {{ $t('home.data') }}
            </el-menu-item>
            <el-menu-item index="/home/algorithm">
              {{ $t('home.algorithm') }}
            </el-menu-item>
            <el-menu-item index="/home/service">
              {{ $t('home.service') }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/case/index">
            {{ $t('nav.case') }}
          </el-menu-item>
          <el-menu-item index="/project/all" v-if="isLogin">
            {{ $t('nav.project') }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <div class="right right-layout">
          <span class="language" @click="changeLanguage">
            <svg-icon
              :name="isEnglish ? 'language-en' : 'language-zh'"
              class="logged-data"
              color="#000"
              width="18"
              height="18"
            />
          </span>
          <!-- 我的资源 -->
          <span
            @click="handleLoggedData"
            class="logged-data-item"
            v-if="isLogin"
          >
            <svg-icon
              v-show="historyIndex !== 1"
              name="my-resources"
              class="logged-data"
              width="18"
              height="18"
            />
            <svg-icon
              v-show="historyIndex === 1"
              name="close"
              class="icon-close"
              color="#000"
              width="14"
              height="14"
            />
          </span>
          <!-- 我的账户 -->
          <span class="user" @click="handleUser" v-if="isLogin">{{
            userName
          }}</span>
          <span class="user" @click="connectWallet" v-else>{{
            $t('home.connectWallet')
          }}</span>
          <span @click="handleUser" class="user-item" v-if="isLogin">
            <svg-icon
              v-show="historyIndex !== 2"
              name="user"
              class="icon-user"
              color="#000"
              width="18"
              height="18"
            />
            <svg-icon
              v-show="historyIndex === 2"
              name="close"
              class="icon-close"
              color="#000"
              width="14"
              height="14"
            />
          </span>
        </div>
      </el-col>
    </el-row>
    <transition name="drawer-fade">
      <RightDrawer
        v-if="historyIndex > 0"
        :historyIndex="historyIndex"
        @clickItem="handeleClose"
        ref="RightDrawer"
      ></RightDrawer>
    </transition>
    <DialogView :visible.sync="visible"></DialogView>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'
import { getLocale } from '@/lang'
import DialogView from '@/components/Dialog/index.vue'
import RightDrawer from './Drawer.vue'
import { getSubStr } from '@/utils/format'
import alayaService from '@/services/alayaService'
import { getUserName } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
@Component({
  components: {
    RightDrawer,
    DialogView,
  },
})
export default class HeaderComponent extends Vue {
  private isEnglish: boolean = false
  private isUserShow: boolean = false
  private isLoggedData: boolean = false
  private historyIndex: number = 0
  private visible: boolean = false

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }
  get isLogin() {
    console.log('alayaState', alayaService.checkAddress())
    return !!UserModule.token && alayaService.checkAddress()
  }
  get userName() {
    return getSubStr(UserModule.user_info.userName)
  }
  private handleUser() {
    if (this.historyIndex !== 2) {
      this.historyIndex = 2
    } else {
      this.historyIndex = 0
    }
  }
  // 点击切换资源
  private handleLoggedData() {
    if (this.historyIndex !== 1) {
      this.historyIndex = 1
    } else {
      this.historyIndex = 0
    }
  }
  private handleSelect(key: string, keyPath: string) {
    // console.log(key, keyPath)
  }
  // 关闭右侧窗口
  private handeleClose() {
    this.isUserShow = false
    this.isLoggedData = false
    this.historyIndex = 0
  }
  private changeLanguage() {
    this.isEnglish = !this.isEnglish
    const lang = this.isEnglish ? 'en' : 'zh'
    AppModule.SetLanguage(lang)
    this.$i18n.locale = lang
  }
  private connectWallet() {
    this.visible = true
  }
  private async handleName() {
    if (!this.isLogin) return
    const checkName = !!UserModule.user_info.userName
    const checkAddress = alayaService.checkAddress()
    if (!checkName && checkAddress) {
      const address = UserModule.user_info.address
      const { data } = await getUserInfo({ address })
      UserModule.SET_USER(data)
    }
  }
  private mounted() {
    setTimeout(() => {
      this.handleName()
    }, 13)
  }
  private created() {
    const lang = getLocale()
    this.isEnglish = lang === 'en'
    ;(this as any).$bus.$on('connectWallet', () => {
      this.connectWallet()
    })
  }
}
</script>

<style scoped lang="stylus">
.header {
  padding: 0px 24px;
  background #fff
  position relative
  min-width 1210px
  box-sizing: border-box
  .header-layout {
    font-size: 18px;
    color: #fff;
    font-weight: 500;
  }

  .left-loyout {
    .logo-wrap{
      margin-right 180px
      .logo-svg{
        vertical-align: -8px;
      }
    }
    .el-menu-item {
      font-size 16px
    }
    >>> .el-submenu .el-submenu__title:hover{
        background-color: #E2EFF9 !important;
        i {
            color: #5F4FFB;
        }
    }
    >>> .el-submenu__title {
        font-size 16px
      }
    .el-menu-item:hover{
      // outline: 0 !important;
      color: #5F4FFB !important;
      background #fff !important;
    }
    >>> .el-submenu:not(.is-active):hover .el-submenu__title{
      background: #fff !important;
      color: #5F4FFB !important;
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
    color #000
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
    // span:not(.user,.language):hover {
    //   background: #545c64
    // }
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
  background: #fff !important;
  color: #5F4FFB !important;
}
</style>
