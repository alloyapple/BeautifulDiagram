import { setRequestLocale } from 'next-intl/server';
import { GitBranch } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI流程图生成器 - 智能创建业务流程图',
    description: '免费AI流程图工具，用自然语言描述业务流程，AI自动生成专业流程图。支持拖拽编辑、多种节点样式、高清导出。适合业务分析、系统设计。',
    keywords: ['AI流程图', '流程图生成器', '业务流程图', '流程图工具', '工作流程图', '在线流程图'],
  },
  en: {
    title: 'AI Flowchart Generator - Create Business Process Diagrams',
    description: 'Free AI flowchart tool. Describe your process in natural language, AI generates professional flowcharts. Drag-and-drop editing, multiple node styles, HD export. Perfect for business analysis, system design.',
    keywords: ['AI flowchart', 'flowchart generator', 'business process diagram', 'flowchart tool', 'workflow diagram', 'online flowchart'],
  },
};

const FEATURES = {
  zh: [
    '智能流程生成：描述业务场景，AI自动识别步骤和决策点',
    '丰富节点类型：开始/结束、流程、判断、数据等多种节点',
    '自动布局：智能排列节点位置，优化连线走向',
    '实时编辑：拖拽调整节点位置，修改连接关系',
    '高清导出：支持PNG、SVG高清图片导出',
    '模板复用：保存常用流程模板，快速复用',
  ],
  en: [
    'Smart Process Generation: Describe your scenario, AI identifies steps and decision points',
    'Rich Node Types: Start/End, Process, Decision, Data and more',
    'Auto Layout: Intelligent node positioning and connection routing',
    'Real-time Editing: Drag nodes, modify connections instantly',
    'HD Export: PNG and SVG high-quality image export',
    'Template Reuse: Save common process templates for quick reuse',
  ],
};

const USE_CASES = {
  zh: [
    '业务分析师：绘制业务流程，识别优化机会',
    '产品经理：设计用户旅程和操作流程',
    '开发团队：梳理系统逻辑和数据流向',
    'HR部门：制作入职流程和审批流程图',
    '运营团队：规划营销活动和客户服务流程',
  ],
  en: [
    'Business Analysts: Map business processes, identify optimization opportunities',
    'Product Managers: Design user journeys and operation flows',
    'Development Teams: Outline system logic and data flows',
    'HR Departments: Create onboarding and approval processes',
    'Operations Teams: Plan marketing campaigns and customer service flows',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/flowchart',
    keywords: content.keywords,
  });
}

export default async function FlowchartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Flowchart', url: `${SITE_URL}/${locale}/flowchart` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="flowchart"
        icon={<GitBranch className="h-8 w-8" />}
        gradient="from-blue-500 to-blue-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
