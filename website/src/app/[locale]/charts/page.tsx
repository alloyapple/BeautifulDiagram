import { setRequestLocale } from 'next-intl/server';
import { BarChart3 } from 'lucide-react';
import { ToolLandingPage } from '@/components/tools/ToolLandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, softwareJsonLd } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/config';

const SEO_CONTENT = {
  zh: {
    title: 'AI数据图表生成器 - Excel数据可视化工具',
    description: '上传Excel文件，AI自动分析数据并生成专业图表。支持柱状图、折线图、饼图等20+图表类型。无需编程，一键生成ECharts可视化。',
    keywords: ['AI图表', '数据可视化', 'Excel转图表', 'ECharts生成器', '数据图表', '在线图表工具'],
  },
  en: {
    title: 'AI Data Chart Generator - Excel Data Visualization Tool',
    description: 'Upload Excel files, AI analyzes data and generates professional charts. Supports bar, line, pie and 20+ chart types. No coding required, instant ECharts visualization.',
    keywords: ['AI chart', 'data visualization', 'Excel to chart', 'ECharts generator', 'data chart', 'online chart tool'],
  },
};

const FEATURES = {
  zh: [
    'Excel智能解析：上传Excel自动识别数据维度',
    '20+图表类型：柱状图、折线图、饼图、雷达图等',
    '智能推荐：AI根据数据特征推荐最佳图表类型',
    '交互式图表：支持缩放、筛选、数据提示',
    '实时预览：调整配置即时查看效果',
    '高清导出：导出PNG用于报告和演示',
  ],
  en: [
    'Smart Excel Parsing: Upload Excel, auto-detect data dimensions',
    '20+ Chart Types: Bar, line, pie, radar and more',
    'Smart Recommendations: AI suggests best chart type for your data',
    'Interactive Charts: Zoom, filter, tooltips supported',
    'Real-time Preview: Adjust config, see changes instantly',
    'HD Export: Export PNG for reports and presentations',
  ],
};

const USE_CASES = {
  zh: [
    '数据分析师：快速探索数据，发现趋势和异常',
    '市场团队：制作销售报告和业绩仪表盘',
    '财务部门：可视化财务数据和预算对比',
    '产品团队：分析用户行为和产品指标',
    '研究人员：展示实验结果和统计数据',
  ],
  en: [
    'Data Analysts: Quickly explore data, discover trends and anomalies',
    'Marketing Teams: Create sales reports and performance dashboards',
    'Finance Departments: Visualize financial data and budget comparisons',
    'Product Teams: Analyze user behavior and product metrics',
    'Researchers: Present experiment results and statistics',
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = SEO_CONTENT[locale as 'zh' | 'en'] || SEO_CONTENT.en;
  return createMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/charts',
    keywords: content.keywords,
  });
}

export default async function ChartsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === 'zh' ? '首页' : 'Home', url: `${SITE_URL}/${locale}` },
    { name: 'Charts', url: `${SITE_URL}/${locale}/charts` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={softwareJsonLd()} />
      <ToolLandingPage
        toolKey="charts"
        icon={<BarChart3 className="h-8 w-8" />}
        gradient="from-green-500 to-green-600"
        features={FEATURES}
        useCases={USE_CASES}
      />
    </>
  );
}
