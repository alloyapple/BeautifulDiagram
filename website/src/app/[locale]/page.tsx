import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { OpenSource } from '@/components/home/OpenSource';
import { CTABanner } from '@/components/home/CTABanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { websiteJsonLd, organizationJsonLd, softwareJsonLd, faqJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';

const SEO_CONTENT = {
  zh: {
    title: 'BeautifulDiagram - AI智能图表生成器 | 思维导图·流程图·架构图',
    description: '用自然语言生成专业图表。开源AI可视化平台，支持思维导图、流程图、数据图表、架构图、Mermaid等6种图表类型。上传Excel/Word/PDF自动分析生成。',
    keywords: ['AI图表生成器', '思维导图AI', '流程图生成器', '架构图工具', 'Mermaid在线', '数据可视化', '开源图表工具', 'Excel转图表'],
  },
  en: {
    title: 'BeautifulDiagram - AI Diagram Generator | Mind Maps, Flowcharts & More',
    description: 'Generate professional diagrams with natural language. Open source AI visualization platform supporting mind maps, flowcharts, data charts, architecture diagrams, and Mermaid. Upload Excel/Word/PDF for auto-analysis.',
    keywords: ['AI diagram generator', 'mind map AI', 'flowchart tool', 'architecture diagram', 'Mermaid online', 'data visualization', 'open source diagram tool', 'Excel to chart'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({ 
    title: content.title, 
    description: content.description,
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareJsonLd()} />
      <JsonLd data={faqJsonLd(locale)} />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <OpenSource />
      <CTABanner />
    </>
  );
}
