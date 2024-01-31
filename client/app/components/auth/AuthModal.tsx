import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody, NavbarItem, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from '@/app/components/auth/RegisterForm'

// @ts-ignore
export default function AuthModal({user, setUser, selectedStr}) {
  const [selected, setSelected] = React.useState(selectedStr)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

  return (
      <>
        <NavbarItem className="hidden lg:flex">
          <h1 onClick={() => {
            onOpen()
            setSelected('login')
          }} className="text-blue-600 cursor-pointer">Connexion</h1>
        </NavbarItem>
        <NavbarItem>
          <Button onPress={() => {
            onOpen()
            setSelected('register')
          }} color="primary" variant="flat">
            Inscription
          </Button>
        </NavbarItem>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="2xl"
        >
          <ModalContent>
            {(onClose) => (
                <div className="flex flex-col w-full">
                  <Card className="max-w-full">
                    <CardBody className="overflow-hidden">
                      <Tabs
                          fullWidth
                          size="md"
                          aria-label="Tabs form"
                          selectedKey={selected}
                          onSelectionChange={setSelected}
                      >
                        <Tab key="login" title="Connexion">
                          <LoginForm user={user} setUser={setUser} />
                        </Tab>
                        <Tab key="register" title="Inscription">
                          <RegisterForm user={user} setUser={setUser} />
                        </Tab>
                      </Tabs>
                    </CardBody>
                  </Card>
                </div>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}