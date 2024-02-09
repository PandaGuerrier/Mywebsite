import React, { useContext, useState } from 'react'
import api from '@/services/api'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { UserContext } from '@/app/hooks/useUser'

export type Errors = {
  [key: string]: {
    field: string
    message: string
  }
}

// @ts-ignore
export default function RegisterForm() {
  const [errors, setErrors] = useState({} as Errors)
  const { user, setUser } = useContext(UserContext)

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

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await api.post('/auth/register', {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        username: event.currentTarget.username.value,
        repeat_password: event.currentTarget.repeat_password.value,
      })

      setUser({
        ...response.data.user,
        isConnected: true,
        error: null
      })

      toast.success("Welcome " + response.data.user.username, {
        position: "bottom-right",
        duration: 5000,
      })
    } catch (e: any) {
      sortErrors(e.response.data.errors)
      return;
    }
  }

  return (
      <form onSubmit={register}>
        <ModalHeader
            className="flex flex-col gap-1 items-center justify-center text-3xl">Register</ModalHeader>
        <ModalBody>
          <Input
              autoFocus
              name="username"
              label="Username"
              placeholder="Enter your username"
              variant="bordered"
              color={errors.username ? 'danger' : 'primary'}
              errorMessage={errors.username?.message}
          />
            <Input
                autoFocus
                name="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                color={errors.email ? 'danger' : 'primary'}
                errorMessage={errors.email?.message}
            />
          <div className="flex space-x-4">
            <Input
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                color={errors.password ? 'danger' : 'primary'}
                errorMessage={errors.password?.message}
            />
            <Input
                label="Repeat Password"
                name="repeat_password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                color={errors.repeat_password ? 'danger' : 'primary'}
                errorMessage={errors.repeat_password?.message}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" type="submit">
            Register
          </Button>
        </ModalFooter>
      </form>
  )

}