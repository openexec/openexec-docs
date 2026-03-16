import {themes as githubThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenExec Docs',
  tagline: 'Deterministic AI Operating System v0.6.7',
  favicon: 'img/favicon.svg',

  url: 'https://docs.openexec.io',
  baseUrl: '/',

  organizationName: 'openexec',
  projectName: 'openexec-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/openexec/openexec-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'OpenExec',
      logo: {
        alt: 'OpenExec Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/engine/intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://openexec.io',
          label: 'Main Site',
          position: 'right',
        },
        {
          href: 'https://github.com/openexec',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/engine/intro',
            },
            {
              label: 'Concepts',
              to: '/engine/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/openexec',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenExec. Built with Docusaurus.`,
    },
    prism: {
      theme: githubThemes.github,
      darkTheme: githubThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
