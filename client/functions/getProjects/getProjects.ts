import api from '@/services/api'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Project } from '@/types/Project'

export async function getProjects(all = false) {
  try {
    const response = await api.get('/api/v1/projects/' + (all ? 'all' : 'true'))
    const payload = response.data

    const projects = payload.projects as Project[]
    console.log(projects)
    return projects.reverse()
  } catch (e) {
    toast.error('Error while fetching projects')
    return []
  }
}