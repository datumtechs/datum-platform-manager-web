<template>
  <el-drawer
    :title="$t('head.myAccount')"
    :append-to-body="true"
    :modal-append-to-body="false"
    class="_drawer"
    :custom-class="'moirae-info-drawer'"
    :close-on-press-escape="false"
    :size="size"
    :destroy-on-close="true"
    :visible="show"
    @close="allClose"
  >
    <ul v-if="!editType" class="drawer-main-ul">
      <li @click="edit('default')">
        <span><i class="margin-r10 el-icon-edit-outline" /> {{ $t('head.editNickname') }}</span>
      </li>
      <li @click="edit('node')">
        <span><i class="margin-r10 el-icon-link" /> {{ $t('head.nodeManagement') }}</span>
      </li>
      <li @click="logout">
        <span><i class="margin-r10 el-icon-bangzhu" /> {{ $t('head.logout') }}</span>
      </li>
    </ul>
    <template v-if="editType == 'default'">
      <Account v-bind="$attrs" @close="_close" />
    </template>
    <template v-if="editType == 'node'">
      <NodeManagement @close="_close" />
    </template>
  </el-drawer>
</template>
<script>
import NodeManagement from './components/NodeManangment.vue'
import Account from './components/Account.vue'
export default {
  name: 'Drawer',
  components: { NodeManagement, Account },
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      size: 300,
      editType: ''
    }
  },
  computed: {
    show: function () {
      return this.showDrawer
    }
  },
  methods: {
    logout () {
      this.$emit('logoutFn')
    },
    edit (type) {
      this.editType = typeof type === 'string' ? type : 'default'
      this.size = this.size === 300 ? 560 : 300
    },
    _close () {
      this.size = 300
      this.editType = ''
    },
    allClose () {
      // this._close()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
$head-height: 46px;
// .el-drawer__wrapper {
//   margin-top: $head-height;
// }
._drawer {
  margin-top: $head-height;
  .moirae-info-drawer {
    transition: width 0.4s;
    padding: 0 20px;
    .el-drawer__header {
      padding: 20px 0 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
      &:first-child {
        font-style: normal;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        font-family: DINPro-Medium, Ali-Medium;
      }
    }
    .margin-r10 {
      margin-right: 10px;
    }
    .drawer-main-ul {
      width: 100%;
      li {
        cursor: pointer;
        padding: 10px 0;
        font-size: 16px;
        margin-bottom: 10px;
        &:hover {
          color: #672cdf;
        }
      }
    }
    ._com-span {
      color: #0f62fe;
      cursor: pointer;
      i {
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .wallet-address {
      display: flex;
      align-items: center;
      // flex-direction: ;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      span:nth-child(2) {
        @extend ._com-span;
      }
    }
    .en-wallet-address {
      display: block;
      span:nth-child(3) {
        @extend ._com-span;
      }
    }
    .button-wrap {
      margin-top: 20px;
    }
    .copy-Address {
      position: absolute;
      opacity: 0;
      left: 0;
    }
  }
}
</style>