import { setRequestLocale } from 'next-intl/server';
import { Cpu } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI架构图生成器 - 云架构与系统设计工具',
    description: '用自然语言描述系统架构，AI自动生成专业云架构图。支持AWS、Azure、GCP图标库，适合技术文档、方案演示、架构评审。',
    keywords: ['AI架构图', '云架构图', '系统架构图', '网络拓扑图', 'Draw.io', '架构设计工具'],
  },
  en: {
    title: 'AI Architecture Diagram Generator - Cloud & System Design Tool',
    description: 'Describe your system architecture in natural language, AI generates professional cloud diagrams. AWS, Azure, GCP icon libraries included. Perfect for technical docs, proposals, architecture reviews.',
    keywords: ['AI architecture diagram', 'cloud architecture', 'system diagram', 'network topology', 'Draw.io', 'architecture design tool'],
  },
};

const FEATURES = {
  zh: [
    '自然语言描述：用文字描述架构，AI生成可视化图表',
    '云服务商图标：AWS、Azure、GCP、阿里云图标库',
    '专业画布：支持缩放、对齐、图层管理',
    '丰富模板：微服务、三层架构、事件驱动等模板',
    'Draw.io兼容：导出标准Draw.io格式',
    '团队协作：支持分享和协作编辑',
  ],
  en: [
    'Natural Language Input: Describe architecture in text, AI creates visual diagram',
    'Cloud Provider Icons: AWS, Azure, GCP, Alibaba Cloud icon libraries',
    'Professional Canvas: Zoom, alignment, layer management',
    'Rich Templates: Microservices, 3-tier, event-driven patterns',
    'Draw.io Compatible: Export standard Draw.io format',
    'Team Collaboration: Share and collaborative editing',
  ],
};

const USE_CASES = {
  zh: [
    '架构师：设计系统架构，评审技术方案',
    'DevOps工程师：规划云基础设施和部署架构',
    '技术团队：绘制系统文档和运维拓扑',
    '售前工程师：制作方案演示和客户汇报',
    'CTO/技术总监：展示技术战略和演进路线',
  ],
  en: [
    'Architects: Design system architecture, review technical proposals',
    'DevOps Engineers: Plan cloud infrastructure and deployment architecture',
    'Technical Teams: Create system documentation and ops topology',
    'Pre-sales Engineers: Build proposal demos and client presentations',
    'CTOs/Tech Directors: Present technical strategy and evolution roadmaps',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/architecture',
    keywords: content.keywords,
  });
}

export default async function ArchitecturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Architecture', url: `${SITE_URL}/${locale}/architecture` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="architecture"
        icon={<Cpu className="h-8 w-8" />}
        gradient="from-orange-500 to-orange-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
