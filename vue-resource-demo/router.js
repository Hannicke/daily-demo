import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './routers/index.js'

Vue.use(VueResource)
Vue.use(VueRouter)

//解决POST传值
Vue.http.options.emulateJSON = true
// 解决测试环境跨域，服务器Cookie设置
Vue.http.options.credentials = true

const router = new VueRouter({
  routes
})

// 隐藏底部DOCK栏
router.beforeEach((to, from, next) => {
  let toPath = to.path
  // let fromPath = from.path
  // console.log(`to: ${toPath} from: ${fromPath}`)
  if (toPath.replace(/[^/]/g, '').length > 1) {
    router.app.isIndex = false
  } else {
    let depath = toPath === '/'
    router.app.isIndex = depath ? 0 : 1
  }
  next()
})

export default router
