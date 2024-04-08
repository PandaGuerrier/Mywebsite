import React, { useContext, useState } from 'react'
import api from '@/services/api'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import AlertComponent from '@/app/components/AlertComponent'
import { Checkbox, Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { UserContext } from '@/app/hooks/useUser'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = React.useState(false)
  const { setUser } = useContext(UserContext)

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await api.post('/auth/login', {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        rememberMe: rememberMe
      })

      setUser({
        ...response.data.user,
        isConnected: true,
        error: null
      })

      toast.success("Hey " + response.data.user.username + " !", {
        position: "bottom-right",
        duration: 5000,
      })
    }  catch (e: any) {
      setError("An error has occurred, please check your credentials.")
      return;
    }
  }

  return (
      <form onSubmit={login}>
        <ModalHeader  className="flex flex-col gap-1 items-center justify-center text-3xl">Login</ModalHeader>
        <AlertComponent message={error} />
        <ModalBody>
          <Input
              autoFocus
              name="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              color={'primary'}
          />
          <Input
              label="Password"
              name="password"
              placeholder="Enter your password"
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
              Remember me
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" type="submit">
            Login
          </Button>
        </ModalFooter>
      </form>
  )

}