import type { BlogPost } from '../mdx/types';
import { SITE_URL, SITE_CONFIG } from '@/lib/config';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_URL,
    description: 'AI-powered intelligent visualization platform for diagrams',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [SITE_CONFIG.github],
  };
}

export function blogPostJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: 'BeautifulDiagram Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${post.locale}/blog/${post.slug}`,
    },
    inLanguage: post.locale === 'zh' ? 'zh-CN' : 'en',
  };
}

export function softwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.shortName,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'AI-powered diagram generation platform with six specialized agents for mind maps, flowcharts, data charts, architecture diagrams, and more.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
    featureList: [
      'AI Mind Map Generator',
      'Flowchart Creator',
      'Data Visualization Charts',
      'Architecture Diagram Tool',
      'Mermaid Diagram Support',
      'Infographic Designer',
    ],
  };
}

export function faqJsonLd(locale: string) {
  const faqs = locale === 'zh' ? [
    {
      question: 'BeautifulDiagram 是免费的吗？',
      answer: '是的，BeautifulDiagram 完全开源免费，采用 AGPL-3.0 协议。你可以自行部署或使用在线版本。',
    },
    {
      question: '支持哪些图表类型？',
      answer: '支持6种专业图表：思维导图、流程图、数据图表（ECharts）、架构图（Draw.io）、Mermaid图表、信息图。',
    },
    {
      question: '可以上传文件生成图表吗？',
      answer: '支持上传 Excel、PDF、Word、PPT 等文件，AI 会自动解析内容并生成相应的图表。',
    },
    {
      question: '支持哪些 AI 模型？',
      answer: '支持 OpenAI、DeepSeek、Claude 等主流模型，也支持本地部署的大模型如 Ollama。',
    },
  ] : [
    {
      question: 'Is BeautifulDiagram free?',
      answer: 'Yes, BeautifulDiagram is fully open source under AGPL-3.0 license. You can self-host or use the online version for free.',
    },
    {
      question: 'What diagram types are supported?',
      answer: 'Six specialized diagram types: Mind Maps, Flowcharts, Data Charts (ECharts), Architecture Diagrams (Draw.io), Mermaid Diagrams, and Infographics.',
    },
    {
      question: 'Can I upload files to generate diagrams?',
      answer: 'Yes, you can upload Excel, PDF, Word, PPT files. AI will automatically parse the content and generate corresponding diagrams.',
    },
    {
      question: 'Which AI models are supported?',
      answer: 'Supports OpenAI, DeepSeek, Claude, and other mainstream models. Also supports locally deployed models like Ollama.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
