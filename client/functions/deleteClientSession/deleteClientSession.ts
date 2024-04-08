import api from '@/services/api'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export async function deleteClientSession(): Promise<void> {
  try {
    await api.delete('/auth/logout')
    toast.success("You have been logout !", {
      position: "bottom-right",
      duration: 5000,
    })
  } catch (e) {
    toast.error('Error while logging out')
  }
}