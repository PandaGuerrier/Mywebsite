import React, { useEffect, useState } from 'react'
import { MovingBorderButton } from '@/app/components/ui/moving-border'
import { Meteors } from '@/app/components/ui/meteors'
import { Input } from '@nextui-org/react'
import { Textarea } from '@nextui-org/input'
import api from '@/services/api'
import { toast } from 'sonner'
import { Errors } from '@/app/components/auth/RegisterForm'

export default function ContactForm() {
  const [errors, setErrors] = useState({} as Errors)
  const [cooldown, setCooldown] = useState(0)

  function sortErrors(errors: any) {
    const errorsSorted = {}
    for (const errorIndex in errors) {
      const error = errors[errorIndex]

      // @ts-ignore
      errorsSorted[error.field] = {
        field: error.field,
        message: error.message
      }
    }
    setErrors(errorsSorted)
  }

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown(cooldown - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [cooldown])

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCooldown(3)
    try {
      await api.post('api/v1/contact/', {
        email: event.currentTarget.email.value,
        // @ts-ignore
        name: event.currentTarget.name.value,
        subject: event.currentTarget.subject.value,
        message: event.currentTarget.message.value,
      })



      toast.success("Your contact request has been sent !", {
        position: "top-center",
        duration: 5000,
      })
      // @ts-ignore
      document.getElementById('contact-form')?.reset()
      setErrors({} as Errors)
    }  catch (e: any) {
      console.log(e)
      sortErrors(e.response.data.errors)

      return;
    }
  }
  return (
      <>
        <div className="w-full flex justify-center">
          <div className="w-full relative max-w-5xl">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">

              <h1 className="font-bold text-2xl text-white mb-4 relative z-50 text-center w-full">
                Contact Me
              </h1>

              <form onSubmit={login} id={"contact-form"} className={"w-full space-y-5"}>

                <div className={"w-full flex space-x-3"}>
                  <Input
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      type="text"
                      variant="bordered"
                      color={errors.name ? 'danger' : 'primary'}
                      errorMessage={errors.name?.message}
                      required
                      fullWidth
                  />
                  <Input
                      autoFocus
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      color={errors.email ? 'danger' : 'primary'}
                      errorMessage={errors.email?.message}
                      fullWidth
                  />
                </div>
                <Input
                    label="Subject"
                    name="subject"
                    placeholder="Enter the subject"
                    type="text"
                    variant="bordered"
                    color={errors.subject ? 'danger' : 'primary'}
                    errorMessage={errors.subject?.message}
                    required
                    fullWidth
                />

                <Textarea
                    label="Message"
                    name="message"
                    placeholder="Enter your message"
                    type="text"
                    variant="bordered"
                    color={errors.message ? 'danger' : 'primary'}
                    errorMessage={errors.message?.message}
                    required
                    fullWidth
                />

                <MovingBorderButton duration={5000} containerClassName={"h-[50px] w-full"} disabled={cooldown != 0}>
                  <h1 className="text-black dark:text-white md:text-base text-sm">
                    {
                      cooldown > 0 ? `Wait ${cooldown}s before resend` : "Send Message"
                    }
                  </h1>
                </MovingBorderButton>
              </form>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </>

  )
}