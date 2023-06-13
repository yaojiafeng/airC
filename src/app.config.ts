export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/userCenter/index',
  ],
  window: {
    // backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    // navigationBarTextStyle: 'black'
    navigationStyle: "custom"
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '休闲',
      },
      {
        pagePath: 'pages/userCenter/index',
        text: '我的',
      },
    ],
  },
})
