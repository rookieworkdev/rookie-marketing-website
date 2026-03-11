'use client'

import { cn, sectionContainer, sectionWrapper } from '@/lib/utils'
import { BrainCircuit, FileText, Handshake, Search, UserPlus, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const candidateSteps: Step[] = [
  {
    icon: UserPlus,
    title: 'Skapa din profil',
    description: 'Lägg in kompetens, erfarenhet och preferenser. Klart på några minuter.',
  },
  {
    icon: BrainCircuit,
    title: 'AI matchar dig',
    description: 'Vår AI analyserar din profil och kopplar dig till relevanta uppdrag.',
  },
  {
    icon: Handshake,
    title: 'Börja jobba',
    description: 'Genomför intervju, få ditt uppdrag och kom igång. Helt utan krångel.',
  },
]

const clientSteps: Step[] = [
  {
    icon: FileText,
    title: 'Publicera uppdrag',
    description: 'Beskriv rollen, kompetenskrav och preferenser. Klart på några minuter.',
  },
  {
    icon: Search,
    title: 'AI hittar kandidater',
    description: 'Vår AI rankar och presenterar de bästa kandidaterna för ditt uppdrag.',
  },
  {
    icon: Users,
    title: 'Tillsätt rollen',
    description: 'Granska profiler, boka intervju och anställ. Allt på samma plats.',
  },
]

type Tab = 'candidate' | 'client'

const tabs: { key: Tab; label: string }[] = [
  { key: 'candidate', label: 'För kandidater' },
  { key: 'client', label: 'För företag' },
]

function StepCard({ step, index }: { step: Step; index: number }) {
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
          'bg-background flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm',
          'ring-border/50 ring-1'
        )}
      >
        <step.icon className="text-foreground h-6 w-6" strokeWidth={1.5} />
      </div>
      <span className="text-muted-foreground mt-4 text-sm font-medium">Steg {index + 1}</span>
      <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<Tab>('candidate')
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
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Så fungerar Rookie</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Från profil till tillsättning — tre steg med AI i förarsätet.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
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
        </div>

        {/* Steps grid */}
        <div className="mt-12">
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
        </div>
      </div>
    </section>
  )
}
