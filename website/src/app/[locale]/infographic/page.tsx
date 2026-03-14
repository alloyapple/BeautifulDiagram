import { setRequestLocale } from 'next-intl/server';
import { Image as ImageIcon } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI信息图生成器 - 数据海报设计工具',
    description: '将数据转化为精美信息图。AI分析数据特征，自动选择最佳模板和布局。适合数据报告、营销海报、知识卡片。',
    keywords: ['AI信息图', '信息图生成器', '数据海报', '可视化设计', 'AntV信息图', '数据故事'],
  },
  en: {
    title: 'AI Infographic Generator - Data Poster Design Tool',
    description: 'Transform data into beautiful infographics. AI analyzes data features, auto-selects best templates and layouts. Perfect for data reports, marketing posters, knowledge cards.',
    keywords: ['AI infographic', 'infographic generator', 'data poster', 'visual design', 'AntV infographic', 'data storytelling'],
  },
};

const FEATURES = {
  zh: [
    '智能模板：50+专业模板，AI自动匹配最佳样式',
    '丰富图表：对比图、层级图、列表图、关系图等',
    '数据驱动：上传数据自动生成可视化',
    '精美设计：专业配色和排版，无需设计技能',
    '自定义编辑：调整颜色、字体、布局',
    '高清导出：适合打印和社交媒体分享',
  ],
  en: [
    'Smart Templates: 50+ professional templates, AI auto-matches best style',
    'Rich Charts: Comparison, hierarchy, list, relationship diagrams',
    'Data-Driven: Upload data for automatic visualization',
    'Beautiful Design: Professional colors and layouts, no design skills needed',
    'Custom Editing: Adjust colors, fonts, layouts',
    'HD Export: Perfect for print and social media sharing',
  ],
};

const USE_CASES = {
  zh: [
    '市场团队：制作营销海报和品牌宣传图',
    '数据团队：将报告转化为可视化故事',
    '教育机构：创建知识卡片和学习资料',
    '媒体编辑：制作新闻图表和数据新闻',
    '企业宣传：展示公司成就和年度报告',
  ],
  en: [
    'Marketing Teams: Create marketing posters and brand visuals',
    'Data Teams: Transform reports into visual stories',
    'Education: Build knowledge cards and learning materials',
    'Media Editors: Produce news charts and data journalism',
    'Corporate Communications: Showcase achievements and annual reports',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/infographic',
    keywords: content.keywords,
  });
}

export default async function InfographicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Infographic', url: `${SITE_URL}/${locale}/infographic` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="infographic"
        icon={<ImageIcon className="h-8 w-8" />}
        gradient="from-pink-500 to-pink-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
