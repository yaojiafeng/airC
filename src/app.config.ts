export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/media/index',
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
        pagePath: 'pages/media/index',
        text: '视频',
      },
    ],
  },
  lazyCodeLoading: 'requiredComponents',
  sitemapLocation: "sitemap.json",
})
