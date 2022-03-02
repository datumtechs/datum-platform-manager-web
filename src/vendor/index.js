import Vue from 'vue'
import Web3Service from './Web3Service'

import {
  Input,
  Message,
  Table,
  TableColumn,
  Select,
  Option,
  Pagination,
  Button,
  Row,
  Col,
  Steps,
  Step,
  Form,
  FormItem,
  Dialog,
  Radio,
  DatePicker,
  TimeSelect,
  TimePicker,
  InputNumber,
  Loading,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Descriptions,
  DescriptionsItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Drawer,
  Switch,
  Cascader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Link
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
const itemAry = [
  Input,
  Table,
  TableColumn,
  Select,
  Option,
  Pagination,
  Button,
  Row,
  Col,
  Steps,
  Step,
  Form,
  FormItem,
  Dialog,
  Radio,
  DatePicker,
  TimeSelect,
  TimePicker,
  InputNumber,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Descriptions,
  DescriptionsItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Drawer,
  Switch,
  Cascader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Link
]
itemAry.map(item => {
  Vue.use(item)
})
Vue.use(Loading.directive)
Vue.prototype.$notify = Notification
const $message = options => {
  return Message({
    ...options,
    offset: 80
  })
}

[ 'success', 'warning', 'info', 'error' ].forEach(type => {
  $message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        offset: 80
      }
      options.type = type
      return Message(options)
    }
  }
})
// 将$message挂载到this上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$Web3Service = Web3Service
  ; (function rem () {
    const winWidth = document.documentElement.clientWidth || document.body.clientWidth
    const htmlDocument = document.getElementsByTagName('html')[0]
    htmlDocument.style.fontSize = winWidth / 13.6 + 'px'
  })()