import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Coralbay Open Data Standard',
  tagline: 'A fictitious API standard - worked example',
  favicon: 'img/favicon.svg',
  url: 'https://amjadleghari.github.io',
  baseUrl: '/ConsumerDataStandards/',
  organizationName: 'amjadleghari',
  projectName: 'ConsumerDataStandards',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    mermaid: true,
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },
  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: Object.fromEntries(
          ['common', 'banking', 'consent'].map((api) => [
            api,
            {
              specPath: `specs/generated/${api}.recipient.yaml`,
              outputDir: `docs/api/${api}`,
              sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
            },
          ]),
        ),
      },
    ],
  ],

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      {
        docs: {sidebarPath: './sidebars.ts', docItemComponent: '@theme/ApiItem'},
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    announcementBar: {
      id: 'fictitious',
      content: 'Fictitious example. Not an official publication of any standards body.',
      isCloseable: false,
    },
    navbar: {
      title: 'Coralbay Open Data Standard',
      items: [
        {type: 'doc', docId: 'intro', label: 'Introduction', position: 'left'},
        {type: 'doc', docId: 'use-case/overview', label: 'Use case', position: 'left'},
        {type: 'doc', docId: 'standards/principles', label: 'Standards', position: 'left'},
        {type: 'docSidebar', sidebarId: 'api', label: 'API reference', position: 'left'},
        {type: 'doc', docId: 'overlays/index', label: 'Overlays', position: 'left'},
        {type: 'doc', docId: 'workflows/index', label: 'Workflows', position: 'left'},
        {type: 'doc', docId: 'contracts/versioning', label: 'Contracts', position: 'left'},
        {type: 'doc', docId: 'architecture/overview', label: 'Architecture', position: 'left'},
        {type: 'doc', docId: 'maintain/index', label: 'Maintain', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'Fictitious example content. MIT licence.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['yaml', 'json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
