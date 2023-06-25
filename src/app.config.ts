export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/userCenter/index',
  ],
  window: {
    // backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '空调',
    // navigationBarTextStyle: 'black'
    navigationStyle: "custom"
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '空调',
      },
      {
        pagePath: 'pages/userCenter/index',
        text: '我的',
      },
    ],
  },
  sitemapLocation: "sitemap.json",
})
