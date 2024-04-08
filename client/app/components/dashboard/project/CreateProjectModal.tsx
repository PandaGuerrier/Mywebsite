'use client'

import React, { useContext, useMemo, useState } from 'react'
import api from '@/services/api'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { UserContext } from '@/app/hooks/useUser'
import { TagsInput } from 'react-tag-input-component'
import { PlusIcon } from 'lucide-react'
import { getProjects } from '@/functions/getProjects/getProjects'
import 'react-quill/dist/quill.snow.css'
import { Switch } from '@nextui-org/switch'
import dynamic from 'next/dynamic'

export type Errors = {
  [key: string]: {
    field: string
    message: string
  }
}

interface Props {
  projects: any
  setProjects: (projects: any) => void
}

export default function CreateProjectModal({ projects, setProjects }: Props) {
  const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
  );
  const [errors, setErrors] = useState({} as Errors)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {user} = useContext(UserContext)
  const [tags, setTags] = useState([] as string[])
  const [text, setText] = useState('' as string)
  const [isPublished, setIsPublished] = useState(false)
  const [image, setImage] = useState<string | null>(null)


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

      await api.post('/api/v1/projects', {
        // @ts-ignore
        title: event.currentTarget.title.value,
        description: event.currentTarget.description.value,
        tags: tags,
        userId: user.id,
        text: text,
        image: image,
        isPublished: isPublished,
      })
      const projectsNew = await getProjects()

      setProjects(projectsNew)

      onClose()
      toast.success('Project is created !', {
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
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
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
                className="flex flex-col gap-1 items-center justify-center text-3xl">Create new Project
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="title"
                  label="Title"
                  placeholder="Enter the project's title"
                  variant="bordered"
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
                  color={errors.description ? 'danger' : 'primary'}
                  errorMessage={errors.description?.message}
                  required
                />

                <div className="flex space-x-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <ReactQuill theme="snow" value={text} onChange={setText}/>
                </div>
                <div>
                  <Switch isSelected={isPublished} onValueChange={setIsPublished}>
                    Publié
                  </Switch>
                </div>
                <div className={"my-4 space-y-5"}>
                  <Input
                      autoFocus
                      name="image"
                      onChange={(e) => setImage(e.target.value)}
                      label="Image"
                      placeholder="Enter the project's image"
                      variant="bordered"
                      value={image || ''}
                      color={errors.image ? 'danger' : 'primary'}
                      errorMessage={errors.image?.message}
                      required
                  />
                  <div className={"flex justify-center mb-5"}>
                    {
                        image && <img src={image} alt="image" className="w-1/2"/>
                    }
                  </div>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button fullWidth color="primary" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}