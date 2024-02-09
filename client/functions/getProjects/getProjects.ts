import api from "@/services/api"
import { AxiosError } from "axios"
import { toast } from 'sonner'
import { Project } from '@/types/Project'

interface Props {
  all: boolean
}

export async function getProjects(all = false) {
  try {
    const response = await api.get('/api/v1/projects/' + (all ? 'all' : 'true'))
    const payload = response.data

    const projects = payload.projects as Project[]
    return projects.reverse()
  } catch (e) {
    const error = e as AxiosError
    toast.error('Error while fetching projects')
  }
}