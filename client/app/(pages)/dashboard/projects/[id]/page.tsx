'use client'

import React, { useContext, useEffect, useState } from 'react'
import api from '@/services/api'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { UserContext } from '@/app/hooks/useUser'
import { TagsInput } from 'react-tag-input-component'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Project } from '@/types/Project'
import { useParams } from 'next/navigation'
import { Switch } from '@nextui-org/switch'

export type Errors = {
  [key: string]: {
    field: string
    message: string
  }
}


export default function App() {
  const [errors, setErrors] = React.useState({} as Errors)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const {user} = useContext(UserContext)
  const [project, setProject] = useState({} as Project)
  const [tags, setTags] = useState(project.tags)
  const [text, setText] = useState(project.text)
  const [isPublished, setIsPublished] = useState(project.is_published)
  const [image, setImage] = useState<string | null>(project.image)
  const params = useParams()

  useEffect(() => {
    (async () => {
      if (!params.id) {
        return
      }
      const projectAPI = await api.get('/api/v1/projects/show/' + params.id)
      setProject(projectAPI.data.project)
      console.log(projectAPI.data.project)
      setTags(projectAPI.data.project.tags)
      setText(projectAPI.data.project.text)
      setIsPublished(projectAPI.data.project.is_published)
      setImage(projectAPI.data.project.image)
      setIsLoaded(true)
    })()
  }, [])

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
        userId: user.id,
        text: text,
        image: image,
        isPublished: isPublished,
      })

      window.location.href = '/dashboard/projects'

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

        {
          !isLoaded ?
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"/>
          </div> : (
                  <form onSubmit={create}>
                    <div
                        className="flex flex-col gap-1 items-center justify-center text-3xl">Update Project {project.title}
                    </div>
                    <div className={"space-y-5"}>
                      <Input
                          autoFocus
                          name="title"
                          label="Title"
                          placeholder="Enter the project's title"
                          variant="bordered"
                          onChange={(e) => setProject({...project, title: e.target.value})}
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
                          onChange={(e) => setProject({...project, description: e.target.value})}
                          value={project.description}
                          color={errors.description ? 'danger' : 'primary'}
                          errorMessage={errors.description?.message}
                      />

                      <div className="flex space-x-4">
                        <div>
                          <TagsInput
                              value={tags}
                              onChange={setTags}
                              name="tags"
                              placeHolder="enter tags"
                              classNames={
                                {
                                  tag: 'bg-white dark:bg-gray-950 text-foreground border border-gray-500',
                                  input: 'text-gray-500 bg-white'
                                }
                              }
                          />
                          <em>press enter or comma to add new tag</em>
                        </div>
                      </div>
                      <ReactQuill theme="snow" value={text} onChange={setText}/>
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
                    </div>
                    <div>
                      <Button fullWidth color="primary" type="submit">
                        Update
                      </Button>
                    </div>
                  </form>
              )
        }

      </>
  )

}