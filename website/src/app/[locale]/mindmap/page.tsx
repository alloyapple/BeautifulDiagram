import { setRequestLocale } from 'next-intl/server';
import { Brain } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI思维导图生成器 - 用自然语言创建专业思维导图',
    description: '免费AI思维导图工具，用自然语言描述即可生成多层级专业思维导图。支持Markdown导出、实时编辑、PNG下载。适合头脑风暴、知识整理、项目规划。',
    keywords: ['AI思维导图', '思维导图生成器', '免费思维导图', '在线思维导图', '头脑风暴工具', '知识图谱'],
  },
  en: {
    title: 'AI Mind Map Generator - Create Professional Mind Maps with Natural Language',
    description: 'Free AI mind map tool. Generate multi-level professional mind maps with natural language. Markdown export, real-time editing, PNG download. Perfect for brainstorming, knowledge organization, project planning.',
    keywords: ['AI mind map', 'mind map generator', 'free mind map', 'online mind map', 'brainstorming tool', 'knowledge graph'],
  },
};

const FEATURES = {
  zh: [
    '自然语言生成：用一句话描述主题，AI自动生成多层级结构',
    '实时编辑：支持拖拽、添加、删除节点，所见即所得',
    '多格式导出：支持Markdown、PNG、SVG等多种格式',
    '智能布局：自动优化节点位置，保持图表美观',
    '多语言支持：中英文界面，适合全球用户',
    '开源免费：完全开源，可自部署，无使用限制',
  ],
  en: [
    'Natural Language Generation: Describe your topic in one sentence, AI creates multi-level structure',
    'Real-time Editing: Drag, add, delete nodes with instant preview',
    'Multi-format Export: Markdown, PNG, SVG and more',
    'Smart Layout: Automatic node positioning for beautiful diagrams',
    'Multi-language Support: Chinese and English interface',
    'Open Source & Free: Fully open source, self-hostable, no restrictions',
  ],
};

const USE_CASES = {
  zh: [
    '产品经理：快速梳理产品功能模块和用户流程',
    '学生：整理课堂笔记，构建知识体系',
    '项目经理：规划项目任务分解结构(WBS)',
    '内容创作者：构思文章大纲和内容框架',
    '团队协作：可视化讨论会议要点和决策',
  ],
  en: [
    'Product Managers: Quickly outline product features and user flows',
    'Students: Organize lecture notes and build knowledge systems',
    'Project Managers: Plan Work Breakdown Structures (WBS)',
    'Content Creators: Brainstorm article outlines and frameworks',
    'Team Collaboration: Visualize meeting highlights and decisions',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/mindmap',
    keywords: content.keywords,
  });
}

export default async function MindmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Mind Map', url: `${SITE_URL}/${locale}/mindmap` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="mindmap"
        icon={<Brain className="h-8 w-8" />}
        gradient="from-purple-500 to-purple-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
