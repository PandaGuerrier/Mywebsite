'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input, Button, Textarea } from '@nextui-org/react'
import { toast } from 'sonner'
import sendContactForm from '@/services/contact'
import { useTranslations } from 'next-intl'
import { Mail, User, MessageSquare, Send } from 'lucide-react'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [errors, setErrors] = useState<{ [key: string]: { field: string; message: string } }>({})
  const [cooldown, setCooldown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown(cooldown - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [cooldown])

  const sendContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setCooldown(3)

    const form = event.currentTarget
    const formData = new FormData(form)
    const newErrors: { [key: string]: { field: string; message: string } } = {}

    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      if (!value) {
        newErrors[key] = {
          field: key,
          message: t('required', { field: key.charAt(0).toUpperCase() + key.slice(1) }),
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const subject = formData.get('subject') as string
      const message = formData.get('message') as string

      const success = await sendContactForm(name, email, subject, message)

      if (!success) {
        toast.error(t('error'), {
          position: 'top-center',
          duration: 5000,
        })
      } else {
        toast.success(t('success'), {
          position: 'top-center',
          duration: 5000,
        })
        form.reset()
      }

      setErrors({})
    } catch (e) {
      console.log(e)
      toast.error(t('error'), {
        position: 'top-center',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
            <form onSubmit={sendContact} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('name')}
                  name="name"
                  placeholder={t('namePlaceholder')}
                  type="text"
                  variant="bordered"
                  size="lg"
                  color={errors.name ? 'danger' : 'default'}
                  errorMessage={errors.name?.message}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: 'text-gray-900 dark:text-white',
                    inputWrapper: 'border-gray-200 dark:border-gray-700 hover:border-pink-400 focus-within:border-pink-500',
                  }}
                />
                <Input
                  label={t('email')}
                  name="email"
                  placeholder={t('emailPlaceholder')}
                  type="email"
                  variant="bordered"
                  size="lg"
                  color={errors.email ? 'danger' : 'default'}
                  errorMessage={errors.email?.message}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: 'text-gray-900 dark:text-white',
                    inputWrapper: 'border-gray-200 dark:border-gray-700 hover:border-pink-400 focus-within:border-pink-500',
                  }}
                />
              </div>

              <Input
                label={t('subject')}
                name="subject"
                placeholder={t('subjectPlaceholder')}
                type="text"
                variant="bordered"
                size="lg"
                color={errors.subject ? 'danger' : 'default'}
                errorMessage={errors.subject?.message}
                startContent={<MessageSquare className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: 'text-gray-900 dark:text-white',
                  inputWrapper: 'border-gray-200 dark:border-gray-700 hover:border-pink-400 focus-within:border-pink-500',
                }}
              />

              <Textarea
                label={t('message')}
                name="message"
                placeholder={t('messagePlaceholder')}
                variant="bordered"
                size="lg"
                minRows={5}
                color={errors.message ? 'danger' : 'default'}
                errorMessage={errors.message?.message}
                classNames={{
                  input: 'text-gray-900 dark:text-white',
                  inputWrapper: 'border-gray-200 dark:border-gray-700 hover:border-pink-400 focus-within:border-pink-500',
                }}
              />

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                isDisabled={cooldown > 0}
                className="w-full bg-pink-500 text-white font-medium"
                endContent={!isLoading && <Send className="w-4 h-4" />}
              >
                {cooldown > 0 ? t('wait', { seconds: cooldown }) : t('send')}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
