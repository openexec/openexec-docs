import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenExec Docs',
  tagline: 'Orchestrate the Reality',
  favicon: 'img/favicon.svg',

  url: 'https://docs.openexec.io',
  baseUrl: '/',

  organizationName: 'openexec', // Usually your GitHub org/user name.
  projectName: 'openexec-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

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
          editUrl:
            'https://github.com/openexec/openexec-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'OpenExec',
      logo: {
        alt: 'OpenExec Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'plannerSidebar',
          position: 'left',
          label: 'Planner',
        },
        {
          type: 'docSidebar',
          sidebarId: 'engineSidebar',
          position: 'left',
          label: 'Engine (Go)',
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
              label: 'OpenExec Planner',
              to: '/planner/intro',
            },
            {
              label: 'OpenExec Engine',
              to: '/engine/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Main Site',
              href: 'https://openexec.io',
            },
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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
