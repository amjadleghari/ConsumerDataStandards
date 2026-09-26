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
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      {
        docs: {sidebarPath: './sidebars.ts'},
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
        {type: 'doc', docId: 'architecture/overview', label: 'Architecture', position: 'left'},
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
