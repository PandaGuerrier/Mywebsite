import React, {useContext, useState} from 'react'
import api from '@/services/api'
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from '@nextui-org/modal'
import { Card, CardBody, DropdownItem, Input, Select, SelectItem, Tab, Tabs } from '@nextui-org/react'
import {Button} from '@nextui-org/button'
import {toast} from 'sonner'
import {UserContext} from '@/app/hooks/useUser'
import { TagsInput } from 'react-tag-input-component'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { PlusIcon } from 'lucide-react'
import { Project } from '@/types/Project'

export type Errors = {
  [key: string]: {
    field: string
    message: string
  }
}

interface Props {
  project: Project
}

export default function UpdateProjectModal({ project }: Props) {
  const [errors, setErrors] = useState({} as Errors)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {user} = useContext(UserContext)
  const [tags, setTags] = useState(project.tags)
  const [color, setColor] = useState(project.color)
  const [text, setText] = useState(project.text)
  const [isPublished, setIsPublished] = useState(project.is_published)
  const [isPin, setIsPin] = useState(project.is_pin)

  const colors = [
    "purple",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "indigo",
  ]

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

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {

      await api.put('/api/v1/projects/' + project.id, {
        // @ts-ignore
        title: event.currentTarget.title.value,
        description: event.currentTarget.description.value,
        tags: tags,
        color: color,
        userId: user.id,
        text: text,
        image: null,
        isPublished: isPublished,
        isPin: isPin
      })

      window.location.reload()

      toast.success('Project is update !', {
        position: 'bottom-right',
        duration: 5000
      })
    } catch (e: any) {
      console.log(e)
      sortErrors(e.response.data.errors)
      return
    }
  }

  return (
    <>
      <DropdownItem>Edit</DropdownItem>
      <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="5xl"
      >
        <ModalContent>
          {(onClose) => (
              <form onSubmit={create}>
                <ModalHeader
                    className="flex flex-col gap-1 items-center justify-center text-3xl">Update Project
                </ModalHeader>
                <ModalBody>
                  <Input
                      autoFocus
                      name="title"
                      label="Title"
                      placeholder="Enter the project's title"
                      variant="bordered"
                      value={project.title}
                      color={errors.title ? 'danger' : 'primary'}
                      errorMessage={errors.title?.message}
                      required
                  />
                  <Input
                      autoFocus
                      name="description"
                      label="Description"
                      placeholder="Enter the project's description"
                      variant="bordered"
                      value={project.description}
                      color={errors.description ? 'danger' : 'primary'}
                      errorMessage={errors.description?.message}
                      required
                  />

                  <div className="flex space-x-4">
                    <Select
                        items={colors}
                        label="Color for background"
                        placeholder="Select an color"
                        className="max-w-xs"
                        color={errors.color ? 'danger' : 'default'}
                        errorMessage={errors.color?.message}
                        required
                    >
                      {colors.map((color, index) => <SelectItem onClick={() => setColor(color)}
                                                                key={index}>{color}</SelectItem>)}
                    </Select>
                    <div>
                      <TagsInput
                          value={tags}
                          onChange={setTags}
                          name="tags"
                          placeHolder="enter tags"
                          classNames={
                            {tag:'bg-white dark:bg-gray-950 text-foreground border border-gray-500', input: 'text-gray-500 bg-white'}
                          }
                      />
                      <em>press enter or comma to add new tag</em>
                    </div>
                  </div>
                  <ReactQuill theme="snow" value={text} onChange={setText} />
                </ModalBody>
                <ModalFooter>
                  <Button fullWidth color="primary" type="submit">
                    Update
                  </Button>
                </ModalFooter>
              </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )

}