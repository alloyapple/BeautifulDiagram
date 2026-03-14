'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { APP_URL } from '@/lib/config';
import type { ReactNode } from 'react';

interface ToolLandingPageProps {
  toolKey: string;
  icon: ReactNode;
  gradient: string;
  features: { zh: string[]; en: string[] };
  useCases: { zh: string[]; en: string[] };
}

export function ToolLandingPage({ toolKey, icon, gradient, features, useCases }: ToolLandingPageProps) {
  const t = useTranslations(`tools.${toolKey}`);
  const tCommon = useTranslations('common');
  const currentLocale = typeof window !== 'undefined' ? 
    (localStorage.getItem('locale') || 'en') : 'en';
  
  const featureList = currentLocale === 'zh' ? features.zh : features.en;
  const useCaseList = currentLocale === 'zh' ? useCases.zh : useCases.en;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-20 pb-16">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl`} />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
              {icon}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={APP_URL} external size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                {tCommon('tryItFree')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {currentLocale === 'zh' ? '核心功能' : 'Core Features'}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureList.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {currentLocale === 'zh' ? '使用场景' : 'Use Cases'}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {useCaseList.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-gray-700">{useCase}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {currentLocale === 'zh' ? '立即开始使用' : 'Get Started Now'}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {currentLocale === 'zh' 
                ? '免费开源，无需注册即可体验 AI 图表生成的魔力'
                : 'Free and open source. Experience the magic of AI diagram generation without registration.'}
            </p>
            <Button href={APP_URL} external size="lg" className="mt-8">
              <Sparkles className="mr-2 h-4 w-4" />
              {tCommon('tryItFree')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
