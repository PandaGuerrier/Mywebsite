import React, {useEffect, useState} from 'react'
import {MovingBorderButton} from '@/app/components/ui/moving-border'
import {Meteors} from '@/app/components/ui/meteors'
import {Input} from '@nextui-org/react'
import {Textarea} from '@nextui-org/input'
import api from '@/services/api'
import {toast} from 'sonner'
import Waves from '../ui/waves'

export default function ContactForm() {
    const [errors, setErrors] = useState({} as { [key: string]: { field: string, message: string } })
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

    const sendContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setCooldown(3)

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newErrors: { [key: string]: { field: string, message: string } } = {};

        // Vérifie chaque champ
        // @ts-ignore
        for (const [key, value] of formData.entries()) {
            if (!value) {
                newErrors[key] = {
                    field: key,
                    message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
                };
            }
        }

        // Si des erreurs sont trouvées, les afficher et arrêter l'exécution
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const name = formData.get("name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");


            await api.post('', {
                // @ts-ignore
                content: "@everyone, someone has sent a contact request: \n\n" + "Name: " + event.currentTarget.name.value + "\nEmail: " + event.currentTarget.email.value + "\nSubject: " + event.currentTarget.subject.value + "\nMessage: " + event.currentTarget.message.value,
            })


            toast.success("Your contact request has been sent !", {
                position: "top-center",
                duration: 5000,
            })
            // @ts-ignore
            document.getElementById('contact-form')?.reset()
            setErrors({})
        } catch (e: any) {
            console.log(e)
            return;
        }
    }
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-full relative max-w-5xl">
                    <div
                        className="absolute inset-0 h-full w-full bg-gradient-to-r dark:from-blue-500 dark:to-teal-500 transform scale-[0.80] bg-blue-500 rounded-full blur-3xl"/>
                    <div
                        className="relative shadow-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                        <Waves

                            lineColor="oklch(27.9% 0.041 260.031)"
                            waveSpeedX={0.02}
                            waveSpeedY={0.01}
                            waveAmpX={40}
                            waveAmpY={20}
                            friction={0.9}
                            tension={0.01}
                            maxCursorMove={120}
                            xGap={12}
                            yGap={36}
                            className={'dark:opacity-80 opacity-10 absolute top-0 left-0 w-full h-full z-10 pointer-events-none'}
                        />
                        <h1 className="font-bold text-2xl text-black dark:text-white mb-4 relative z-50 text-center w-full">
                            Contact Me
                        </h1>

                        <form onSubmit={sendContact} id={"contact-form"} className={"w-full space-y-5"}>
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

                            <MovingBorderButton duration={5000} containerClassName={"h-[50px] w-full"}
                                                disabled={cooldown != 0} as={"button"} type={"submit"}>
                                <h1 className="text-black dark:text-white md:text-base text-sm">
                                    {
                                        cooldown > 0 ? `Wait ${cooldown}s before resend` : "Send Message"
                                    }
                                </h1>
                            </MovingBorderButton>
                        </form>

                        {/* Meaty part - Meteor effect */}

                    </div>
                </div>
            </div>
        </>

    )
}