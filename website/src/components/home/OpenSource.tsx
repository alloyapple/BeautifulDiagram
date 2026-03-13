'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Section } from '@/components/ui/Section';
import { Star } from 'lucide-react';

export function OpenSource() {
  const t = useTranslations('openSource');

  return (
    <Section className="bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Star className="h-7 w-7 text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          {t('subtitle')}
        </p>
      </motion.div>
    </Section>
  );
}
