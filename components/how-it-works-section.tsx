'use client'

import { cn, sectionContainer, sectionWrapper } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { BrainCircuit, FileText, Handshake, Search, UserPlus, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

type Tab = 'candidate' | 'client'

function StepCard({ step, index }: { step: Step; index: number }) {
  const t = useTranslations('howItWorks')
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
      className="bg-muted flex flex-col items-center rounded-2xl p-8 text-center"
    >
      <div
        className={cn(
          'bg-background flex h-14 w-14 items-center justify-center rounded-2xl shadow-xs'
        )}
      >
        <step.icon className="text-foreground h-6 w-6" strokeWidth={1.5} />
      </div>
      <span className="text-muted-foreground mt-4 text-sm font-medium">{t('step', { number: index + 1 })}</span>
      <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  const [activeTab, setActiveTab] = useState<Tab>('candidate')

  const candidateSteps: Step[] = [
    {
      icon: UserPlus,
      title: t('candidate.step1Title'),
      description: t('candidate.step1Description'),
    },
    {
      icon: BrainCircuit,
      title: t('candidate.step2Title'),
      description: t('candidate.step2Description'),
    },
    {
      icon: Handshake,
      title: t('candidate.step3Title'),
      description: t('candidate.step3Description'),
    },
  ]

  const clientSteps: Step[] = [
    {
      icon: FileText,
      title: t('client.step1Title'),
      description: t('client.step1Description'),
    },
    {
      icon: Search,
      title: t('client.step2Title'),
      description: t('client.step2Description'),
    },
    {
      icon: Users,
      title: t('client.step3Title'),
      description: t('client.step3Description'),
    },
  ]

  const tabs: { key: Tab; label: string }[] = [
    { key: 'candidate', label: t('forCandidates') },
    { key: 'client', label: t('forCompanies') },
  ]

  const steps = activeTab === 'candidate' ? candidateSteps : clientSteps

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <div className="bg-muted ring-border/50 inline-flex rounded-full p-1 ring-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'relative rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {steps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
