import { createApp } from 'vue'
import store from './store'
import Taro from '@tarojs/taro'
import './app.scss'

const App = createApp({
  // 使用callContainer前一定要init一下，全局执行一次即可


  onShow(options) { },
  async onLaunch() {
    Taro.cloud.init()
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
export default App
