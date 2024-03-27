// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hello',
  tagline:
    'A TypeScript library for creating animated videos using the Canvas API.',
  url: 'https://havenhq.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.svg',
  organizationName: 'havenhq',
  projectName: 'havenhq.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true,
  },
  customFields: {
    discordUrl: 'https://discord.com/invite/JDjbfp6q2G',
    githubApi: 'https://api.github.com/repos/havenhq/revideo',
    githubUrl: 'https://github.com/havenhq/revideo',
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'keywords', content: 'typescript, animation, library'}],
      image: 'img/banner.png',
      colorMode: {
        defaultMode: 'dark',
      },
      navbar: {
        logo: {
          alt: 'Motion Canvas Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {to: '/api/core', label: 'API', position: 'left'},
        ],
      },
      footer: {
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/a7cDKnn8',
              },
              {
                label: 'Twitter / X',
                href: 'https://twitter.com/redotvideo',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/company/98191419',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/havenhq/revideo',
              },
              {
                label: 'Website',
                href: 'https://re.video/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Revideo. Built with Docusaurus.`,
      },
      algolia: {
        appId: 'N600LQX5YP',
        apiKey: 'de2e18466070e9e59862c08379bc31f0',
        indexName: 're',
      },
      prism: {
        theme: require('./config/codeTheme'),
        darkTheme: require('./config/codeTheme'),
        additionalLanguages: ['glsl'],
      },
    }),
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: require.resolve('./src/css/custom.css'),
      },
    ],
    '@docusaurus/theme-search-algolia',
    '@docusaurus/theme-mermaid',
  ],
  plugins: [
    './typedoc',
    './bundle',
    [
      '@docusaurus/plugin-content-docs',
      {
        routeBasePath: '/',
        sidebarPath: 'sidebars.js',
        exclude: ['**/api/core/*.md', '**/api/2d/*.md'],
        showLastUpdateAuthor: true,
        docItemComponent: '@site/src/components/DocPage',
        admonitions: {
          tag: ':::',
          keywords: [
            'note',
            'tip',
            'info',
            'caution',
            'danger',
            'experimental',
          ],
        },
        editUrl: ({versionDocsDirPath, docPath}) =>
          `https://github.com/havenhq/revideo/blob/main/packages/docs/${versionDocsDirPath}/${docPath}`,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        showReadingTime: true,
        editUrl: ({blogDirPath, blogPath}) =>
          `https://github.com/havenhq/revideo/blob/main/packages/docs/${blogDirPath}/${blogPath}`,
      },
    ],
    '@docusaurus/plugin-content-pages',
    '@docusaurus/plugin-debug',
    '@docusaurus/plugin-sitemap',
    [
      './editor',
      {
        examples: [
          {
            name: 'Random',
            fileName: 'random',
            url: 'Random values generator',
          },
          {
            name: 'Quickstart',
            fileName: 'quickstart',
            url: 'Quickstart example',
          },
          {
            name: 'Logging',
            fileName: 'logging',
            url: 'Logging example',
          },
          {
            name: 'Presentation',
            fileName: 'presentation',
            url: 'Presentation example',
          },
        ],
      },
    ],
  ],
};

module.exports = config;
