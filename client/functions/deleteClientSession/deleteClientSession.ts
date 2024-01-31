import api from "@/services/api"
import { User } from "@/types/User"
import { AxiosError } from "axios"
import { toast } from 'sonner'

export async function deleteClientSession(): Promise<void> {
  try {
    await api.delete('/auth/logout')
    toast.success("Vous êtes bien déconnecté !", {
      position: "bottom-right",
      duration: 5000,
    })
  } catch (e) {
    const error = e as AxiosError
  }
}