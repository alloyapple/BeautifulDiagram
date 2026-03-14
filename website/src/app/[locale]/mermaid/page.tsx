import { setRequestLocale } from 'next-intl/server';
import { Share2 } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI Mermaid图表生成器 - 代码生成技术图表',
    description: '用自然语言描述，AI生成Mermaid语法图表。支持时序图、甘特图、类图、状态图等。开发者友好的文本驱动图表工具。',
    keywords: ['Mermaid生成器', '时序图', '甘特图', '类图', '状态图', 'ER图', '技术图表'],
  },
  en: {
    title: 'AI Mermaid Diagram Generator - Code-Based Technical Diagrams',
    description: 'Describe in natural language, AI generates Mermaid syntax diagrams. Supports sequence, Gantt, class, state diagrams and more. Developer-friendly text-driven diagram tool.',
    keywords: ['Mermaid generator', 'sequence diagram', 'Gantt chart', 'class diagram', 'state diagram', 'ER diagram', 'technical diagram'],
  },
};

const FEATURES = {
  zh: [
    '文本驱动：用Mermaid语法定义图表，版本可控',
    '多种图表：时序图、甘特图、类图、状态图、ER图等',
    '实时预览：编写语法即时渲染图表',
    '代码集成：直接嵌入Markdown和文档',
    '主题定制：支持多种配色主题',
    '高清导出：SVG矢量图导出，无损缩放',
  ],
  en: [
    'Text-Driven: Define diagrams with Mermaid syntax, version control friendly',
    'Multiple Diagrams: Sequence, Gantt, class, state, ER diagrams and more',
    'Real-time Preview: Write syntax, see rendered diagram instantly',
    'Code Integration: Embed directly in Markdown and documentation',
    'Theme Customization: Multiple color themes supported',
    'HD Export: SVG vector export, lossless scaling',
  ],
};

const USE_CASES = {
  zh: [
    '开发团队：绘制API时序图和系统交互流程',
    '项目经理：制作项目甘特图和里程碑计划',
    '数据库设计：创建ER图和数据模型文档',
    '技术写作者：在文档中嵌入可维护的图表',
    '开源项目：在README中展示架构和流程',
  ],
  en: [
    'Dev Teams: Draw API sequence diagrams and system interaction flows',
    'Project Managers: Create project Gantt charts and milestone plans',
    'Database Design: Build ER diagrams and data model documentation',
    'Technical Writers: Embed maintainable diagrams in documentation',
    'Open Source Projects: Display architecture and flows in READMEs',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/mermaid',
    keywords: content.keywords,
  });
}

export default async function MermaidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Mermaid', url: `${SITE_URL}/${locale}/mermaid` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="mermaid"
        icon={<Share2 className="h-8 w-8" />}
        gradient="from-cyan-500 to-cyan-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
