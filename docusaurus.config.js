// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '狐莱姆在盯着你...',
  tagline: '可安可可可爱了!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://qhlg.flime.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QHMY114514', // Usually your GitHub org/user name.
  projectName: 'QHMY114514.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.

        },
        blog: {
          blogSidebarTitle: '乾狐离光的日记本',
          blogSidebarCount: 10,
          showReadingTime: true,

        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/fox.jpg',
      announcementBar: {
        id: 'look_at_me_0',
        content:
          '看我看我!戳<a href="/blog">这里</a>一下',
        backgroundColor: '#288',
        textColor: '#ddd',
        isCloseable: true,
      },
      navbar: {
        hideOnScroll: true,
        title: '乾狐之家,狐狸的衣柜!',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/blog', label: '日记本', position: 'left' },
          {
            type: 'dropdown',
            label: '乾狐一家',
            position: 'left',
            items: [
              {
                label: '关于狐狸',
                to: '/docs/intro',
              },
              {
                label: '我的项目',
                to: '/docs/game',
              },
            ],
          },
          {
            to: '/docs/jrrp',
            label: '今日人品',
            position: 'left',
          },
          {
            to: '/docs/song',
            label: '来听歌吧',
            position: 'left',
          },
          {
            href: 'https://api.lolimi.cn/60/',
            label: '每日60秒',
            position: 'left',
          },
          {
            href: 'https://github.com/QHMY114514',
            label: 'MyGitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '联系狐狸',
            items: [
              {
                label: '我的哔哩哔哩主页',
                href: 'https://space.bilibili.com/454816001',
              },
              {
                label: '我的个人群(QQ)',
                href: 'https://qm.qq.com/q/bImTc3BPsA',
              },
              {
                label: 'Flime官方群(QQ)',
                href: 'https://qm.qq.com/q/qatSwAhTQk',
              }
            ],
          },
          {
            title: '你想找什么?',
            items: [
              {
                label: '狐狸是谁?',
                to: '/docs/intro',
              },
              {
                label: '狐狸怎么叫?',
                to: '/blog',
              },
              {
                label: '小玩具',
                to: '/docs/game',
              },
              {
                label: '狐狸的GitHub主页',
                href: 'https://github.com/QHMY114514',
              },
            ],
          },
          {
            title: '友情链接',
            items: [
              {
                label: '户山兔兔的小站',
                href: 'https://danieltoyama.fun',
              },
              {
                label: 'YukieBot(by 户山兔兔)',
                href: 'https://yukiebot.top',
              },
              {
                label: '桑帛云API',
                href: 'https://api.lolimi.cn',
              },
            ],
          },
        ],
        copyright: `Copyright ©${new Date().getFullYear()} QHLG的小站. Built with Docusaurus.<br /><img style="width:32px;height:32px;margin-bottom:-12px" src="https://moe.one/view/img/ico64.png"></img><a href="https://icp.gov.moe/?keyword=20245009" target="_blank">萌ICP备20245009号</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      giscus: {
        repo: 'QHMY114514/QHMY114514.github.io',
        repoId: 'R_kgDONW1Hww',
        category: 'General',
        categoryId: 'DIC_kwDONW1Hw84ClS0T',
      }
    }),
  // Add the Cloudflare Web Analytics script
  scripts: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      async: true,
      'data-cf-beacon': '{"token": "83e661b0d0b74b4eb1f798f1af124003"}',
    },
  ],
};

export default config;
