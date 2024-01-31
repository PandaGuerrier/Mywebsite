import api from "@/services/api"
import { getNulledUser, User } from '@/types/User'
import { AxiosError } from "axios"
import { toast } from 'sonner'

export async function getClientSession(): Promise<User> {
  try {
    const response = await api.get('/auth/me')
    const payload = response.data

    toast.success("Rebonjour parmis nous " + payload.user.username, {
      position: "bottom-right",
      duration: 5000,
    })
    return {
      ...payload.user,
      isConnected: payload.isConnected,
      error: null,
    }

  } catch (e) {
    const error = e as AxiosError
    return {
      ...getNulledUser(),
      error
    }
  }
}