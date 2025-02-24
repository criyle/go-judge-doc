import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid ({
  title: "Go Judge Documentation",
  description: "Go Judge Documentation",
  srcDir: "src",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/install' }
    ],

    sidebar: [
      {
        text: 'Documentations',
        items: [
          { text: 'Install', link: '/install' },
          { text: 'Design', link: '/design' },
          { text: 'API', link: '/api' },
          { text: 'Example Requests', link: '/example' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'File System Mount', link: '/mount' },
          { text: 'Build', link: '/build' },
          { text: 'Scale', link: '/scale' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/criyle/go-judge' }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    cn: {
      label: '中文',
      lang: 'cn',
      title: "Go Judge 文档",
      themeConfig: {
        nav: [
          { text: '主页', link: '/cn' },
          { text: '文档', link: '/cn/install' }
        ],

        sidebar: [
          {
            text: '文档',
            items: [
              { text: '安装', link: '/cn/install' },
              { text: '设计', link: '/cn/design' },
              { text: 'API', link: '/cn/api' },
              { text: '请求实例', link: '/cn/example' },
              { text: '配置', link: '/cn/configuration' },
              { text: '文件系统挂载', link: '/cn/mount' },
              { text: '编译', link: '/cn/build' },
              { text: '拓展', link: '/cn/scale' },
            ]
          }
        ],
      }
    }
  }
})
