export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/about/index',
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
        pagePath: 'pages/about/index',
        text: '关于',
      },
    ],
  },
  lazyCodeLoading: 'requiredComponents',
  sitemapLocation: "sitemap.json",
})
