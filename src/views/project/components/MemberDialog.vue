<template>
  <div class="dialog">
    <el-dialog
      :title="$t(title)"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="wrap">
        <div class="bottom">
          <div>
            {{ $t('worke.select') }}
          </div>
          <el-select
            v-model="user"
            :placeholder="$t('worke.select')"
            :disabled="type === 1"
            :class="type === 1 ? 'isDisabled' : ''"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <div>
            {{ $t('worke.role') }}
          </div>
          <el-select v-model="role" :placeholder="$t('worke.role')">
            <el-option
              v-for="(item, key, i) in roleOptionMap[language]"
              :key="i"
              :label="item"
              :value="key"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">
          {{ $t('project.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleSubmit" v-preventReClick>
          {{ $t('project.submit') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { userList } from '@/api/user'
import { addProjMember, setProjMember } from '@/api/project'
import { roleOptionMap } from '@/status'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'MemberDialog',
  components: {
    JzButton,
  },
})
export default class MemberDialog extends Vue {
  // 0. 创建 1.编辑
  private type = 0
  private visible = false
  get title() {
    const titles = ['worke.createMember', 'worke.editMember']
    return titles[this.type]
  }
  private user: number | string = ''
  private userOptions = []
  private role: number | string = ''
  private memberId = ''
  get language() {
    return AppModule.language
  }
  get roleOptionMap() {
    return roleOptionMap
  }
  /**
   * 打开成员弹窗
   * @parmams
   * type 0 新增  1编辑
   * list: number[] 成员列表的用户id
   * row  选中当前成员的信息
   */
  private handleOpen(type: number, list: number[], row?: any) {
    // 过滤添加过的成员列表
    this.userOptions.map((item: any) => {
      if (list.includes(item.id)) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
    this.type = type
    if (type > 0) {
      this.user = Number(row.userId)
      this.role = String(row.role)
      this.memberId = row.memberId
    }
    this.visible = true
  }
  private handleClose() {
    this.visible = false
    this.user = ''
    this.role = ''
  }

  // 提交
  @Emit('clickSubmit')
  private async handleSubmit() {
    const { user, role, memberId } = this
    if (user === '') {
      const tips: any = this.$t('tips.selectUser')
      this.$message.error(tips)
      return
    }
    if (role === '') {
      const tips: any = this.$t('tips.selectRole')
      this.$message.error(tips)
      return
    }
    const data: any = {
      userId: user,
      role: Number(role),
    }
    if (this.type) {
      data.id = this.memberId
    } else {
      data.projectId = Number(this.$route.query.pid)
    }
    let code, res
    if (this.type) {
      res = await setProjMember(data)
    } else {
      res = await addProjMember(data)
    }
    code = res.code
    if (code === 10000) {
      this.handleClose()
      this.visible = false
      return true
    } else {
      this.visible = false
      return false
    }
  }
  async getUserList() {
    const { data } = await userList()
    this.userOptions = data
  }
  created() {
    this.getUserList()
  }
}
</script>

<style scoped lang="stylus">
.wrap
  box-sizing border-box
  padding 10px 20px
  width 400px
  .updata
    padding 4px
    color #0F62FE
    cursor pointer
  .updata:hover
    text-decoration: underline
  .bottom
    margin-bottom 10px
  >>> .el-input__inner
        border 0!important;
        border-bottom: 1px solid #8a7e7e!important;
        border-radius: 0!important;
        padding: 3px;
        height 48px!important;
        line-height 48px!important;
        font-size: 14px;
        letter-spacing: 0.16px;
        margin-bottom 4px
        background: #fff
        color #000
      >>> .el-input__inner:focus
        border: 2px solid rgba(15, 98, 254, 1)!important;
</style>
