/** Site-wide configuration for SEO consistency */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://20190601.xyz';

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://20190601.xyz/app';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const SITE_CONFIG = {
  name: 'BeautifulDiagram AI',
  shortName: 'BeautifulDiagram',
  description: {
    en: 'AI-powered diagram generator - Create mind maps, flowcharts, and more with natural language',
    zh: 'AI智能图表生成器 - 用自然语言创建思维导图、流程图等专业图表',
  },
  twitter: '@BeautifulDiagram',
  github: 'https://github.com/alloyapple/BeautifulDiagram',
  locales: ['en', 'zh'] as const,
  defaultLocale: 'en' as const,
} as const;
