import React, { useState } from 'react'
import api from '@/services/api'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import AlertComponent from '@/app/components/AlertComponent'
import { Checkbox, Input, Link } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { User } from '@/types/User'
import { toast } from 'sonner'

type Props = {
  user: User
  setUser: any
}

export default function LoginForm({ user, setUser }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = React.useState(false)

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await api.post('/auth/login', {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        rememberMe: rememberMe
      })

      console.log(response.data)

      setUser({
        ...response.data.user,
        isConnected: true,
        error: null
      })

      console.log(user)

      toast.success("Bonjour " + response.data.user.username + " !", {
        position: "bottom-right",
        duration: 5000,
      })
    }  catch (e: any) {
      setError("Nous n'avons pas pu vous connecter. Veuillez vérifier vos identifiants.")
      return;
    }
  }

  return (
      <form onSubmit={login}>
        <ModalHeader
            className="flex flex-col gap-1 items-center justify-center text-3xl">Connexion</ModalHeader>
        <AlertComponent message={error} />
        <ModalBody>
          <Input
              autoFocus
              name="email"
              label="Email"
              placeholder="Entrez votre email"
              variant="bordered"
              color={'primary'}
          />
          <Input
              label="Mot de passe"
              name="password"
              placeholder="Entrez votre mot de passe"
              type="password"
              variant="bordered"
              color={'primary'}
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
                isSelected={rememberMe}
                onValueChange={setRememberMe}
                classNames={{
                  label: 'text-small'
                }}
                color={'primary'}
            >
              Se souvenir de moi
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Mot de passe oublié ?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" type="submit">
            Connexion
          </Button>
        </ModalFooter>
      </form>
  )

}