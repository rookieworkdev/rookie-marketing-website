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
import { useState } from 'react'

export interface ContactSectionProps {
  variant?: 'simple' | 'full'
  subject?: string
  title?: string
  description?: string
}

export default function ContactSection({
  variant = 'simple',
  subject = 'Allmän förfrågan',
  title = 'Skicka ett meddelande',
  description,
}: ContactSectionProps) {
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
        subject,
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
      setErrorMessage(error instanceof Error ? error.message : 'Ett oväntat fel uppstod')
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
              <h2 className="mb-4 text-3xl font-medium md:text-3xl lg:text-4xl">
                Kan vi hjälpa dig?
              </h2>
              <p className="text-muted-foreground text-lg">
                {description ||
                  'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.'}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-medium tracking-tight">Kontaktuppgifter</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-0 font-semibold">Adress</h4>
                    <p className="text-muted-foreground">
                      Drottninggatan 32, 8tr, 111 51 Stockholm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-0 font-semibold">E-post</h4>
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
                    <h4 className="mb-0 font-semibold">Telefon</h4>
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
            <h3 className="mb-6 text-2xl font-medium tracking-tight">{title}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Namn */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Namn <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ditt för- och efternamn"
                />
              </div>

              {/* Epost & Telefon */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Företags e-post <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="namn@företag.se"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Telefon <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="070-123 45 67"
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
                        Företag <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Ditt företagsnamn"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">
                        Bransch <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.industry}
                        onValueChange={handleSelectChange('industry')}
                        required
                      >
                        <SelectTrigger id="industry" className="w-full">
                          <SelectValue placeholder="Välj bransch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">IT & Tech</SelectItem>
                          <SelectItem value="finance">Bank, Finans & Försäkring</SelectItem>
                          <SelectItem value="retail">Handel & E-handel</SelectItem>
                          <SelectItem value="manufacturing">Tillverkning & Industri</SelectItem>
                          <SelectItem value="consulting">Konsult & Rådgivning</SelectItem>
                          <SelectItem value="media">Media & Kommunikation</SelectItem>
                          <SelectItem value="other">Övrig bransch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tjänstetyp & Erfarenhet */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service_type">
                        Tjänstetyp <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={handleSelectChange('service_type')}
                        required
                      >
                        <SelectTrigger id="service_type" className="w-full">
                          <SelectValue placeholder="Välj tjänstetyp" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direktrekrytering">Direktrekrytering</SelectItem>
                          <SelectItem value="hyresrekrytering">Hyrrekrytering</SelectItem>
                          <SelectItem value="bemanning">Bemanning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Erfarenhet (Senioritet) <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={handleSelectChange('experience')}
                        required
                      >
                        <SelectTrigger id="experience" className="w-full">
                          <SelectValue placeholder="Välj erfarenhetsnivå" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="junior">Junior (0-2 år)</SelectItem>
                          <SelectItem value="mid">Mellan (2-5 år)</SelectItem>
                          <SelectItem value="any">Spelar ingen roll</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Beskriv ditt behov (Fritext) */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  {variant === 'full' ? 'Beskriv ditt behov' : 'Meddelande'}{' '}
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
                      ? 'Berätta hur vi kan hjälpa dig...'
                      : 'Hur kan vi hjälpa dig?'
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
                  jag samtycker till att mina personuppgifter behandlas i Rookies databas i enlighet
                  med vår{' '}
                  <a
                    href="/integritetspolicy"
                    className="text-primary underline hover:no-underline"
                  >
                    integritetspolicy
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
                  Tack för ditt meddelande! Vi återkommer så snart vi kan.
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="bg-destructive/10 text-destructive rounded-md p-4 text-sm"
                >
                  {errorMessage ||
                    'Något gick fel. Försök igen eller kontakta oss via telefon eller e-post.'}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size={16} />
                    Skickar...
                  </span>
                ) : (
                  'Skicka meddelande'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
