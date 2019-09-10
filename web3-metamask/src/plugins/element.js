import ElementUI from 'element-ui'
import { Loading, MessageBox, Notification, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  install(Vue, options) {
    Vue.use(ElementUI)
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
  }
}