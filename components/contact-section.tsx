'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { submitContactAction } from '@/lib/actions/contact'
import { cn, fullBorders, sectionContainer, sectionWrapper } from '@/lib/utils'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export interface ContactSectionProps {
  variant?: 'simple' | 'full'
  subject?: string
  title?: string
  description?: string
}

export default function ContactSection({
  variant = 'simple',
  subject,
  title,
  description,
}: ContactSectionProps) {
  const t = useTranslations('contact')
  const effectiveSubject = subject || t('generalInquiry')
  const effectiveTitle = title || t('sendMessage')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    service_type: '',
    experience: '',
    message: '',
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage(null)

    try {
      const result = await submitContactAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        service_type: formData.service_type,
        experience: formData.experience,
        message: formData.message,
        consent: formData.consent,
        subject: effectiveSubject,
      })

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          service_type: '',
          experience: '',
          message: '',
          consent: false,
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || null)
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : t('unexpectedError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }))
  }

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div>
              <h2 className="mb-4 text-3xl font-medium md:text-4xl">
                {t('canWeHelp')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {description ||
                  t('defaultDescription')}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-medium tracking-tight">{t('contactDetails')}</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-0 font-semibold">{t('address')}</h4>
                    <p className="text-muted-foreground">
                      {t('addressValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-0 font-semibold">{t('emailLabel')}</h4>
                    <a
                      href="mailto:info@rookiework.se"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@rookiework.se
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-0 font-semibold">{t('phoneLabel')}</h4>
                    <a
                      href="tel:+4610129600"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      010 129 60 00
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className={cn('bg-card rounded-lg p-8 shadow-xs', fullBorders())}
          >
            <h3 className="mb-6 text-2xl font-medium tracking-tight">{effectiveTitle}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Namn */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t('name')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('namePlaceholder')}
                />
              </div>

              {/* Epost & Telefon */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t('businessEmail')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('emailPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t('phone')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t('phonePlaceholder')}
                  />
                </div>
              </div>

              {/* Full form fields - only show in 'full' variant */}
              {variant === 'full' && (
                <>
                  {/* Bolag & Bransch */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        {t('company')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder={t('companyPlaceholder')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">
                        {t('industry')} <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.industry}
                        onValueChange={handleSelectChange('industry')}
                        required
                      >
                        <SelectTrigger id="industry" className="w-full">
                          <SelectValue placeholder={t('selectIndustry')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">{t('industryTech')}</SelectItem>
                          <SelectItem value="finance">{t('industryFinance')}</SelectItem>
                          <SelectItem value="retail">{t('industryRetail')}</SelectItem>
                          <SelectItem value="manufacturing">{t('industryManufacturing')}</SelectItem>
                          <SelectItem value="consulting">{t('industryConsulting')}</SelectItem>
                          <SelectItem value="media">{t('industryMedia')}</SelectItem>
                          <SelectItem value="other">{t('industryOther')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tjänstetyp & Erfarenhet */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service_type">
                        {t('serviceType')} <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={handleSelectChange('service_type')}
                        required
                      >
                        <SelectTrigger id="service_type" className="w-full">
                          <SelectValue placeholder={t('selectServiceType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direktrekrytering">{t('directRecruitment')}</SelectItem>
                          <SelectItem value="hyresrekrytering">{t('tempRecruitment')}</SelectItem>
                          <SelectItem value="bemanning">{t('staffing')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        {t('experience')} <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={handleSelectChange('experience')}
                        required
                      >
                        <SelectTrigger id="experience" className="w-full">
                          <SelectValue placeholder={t('selectExperience')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">{t('student')}</SelectItem>
                          <SelectItem value="junior">{t('junior')}</SelectItem>
                          <SelectItem value="mid">{t('mid')}</SelectItem>
                          <SelectItem value="any">{t('any')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Beskriv ditt behov (Fritext) */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  {variant === 'full' ? t('describeNeeds') : t('message')}{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={
                    variant === 'full'
                      ? t('describePlaceholder')
                      : t('messagePlaceholder')
                  }
                  rows={6}
                />
              </div>

              {/* Samtycke */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onCheckedChange={handleCheckboxChange}
                  required
                  className="mt-1"
                />
                <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed">
                  {t('consentText')}{' '}
                  <a
                    href="/integritetspolicy"
                    className="text-primary underline hover:no-underline"
                  >
                    {t('consentLink')}
                  </a>{' '}
                  <span className="text-destructive">*</span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200"
                >
                  {t('successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="bg-destructive/10 text-destructive rounded-md p-4 text-sm"
                >
                  {errorMessage ||
                    t('errorMessage')}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size={16} />
                    {t('submitting')}
                  </span>
                ) : (
                  t('submit')
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
