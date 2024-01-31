import { AxiosError } from "axios"

export interface User {
  id: string
  username: string
  email: string
  role: string
  created_at: string
  updated_at: string,
  isAdmin: boolean,
  isConnected: boolean,
  error: AxiosError | null
}

export function getNulledUser(): User {
  return {
    id: '',
    username: '',
    email: '',
    role: '',
    created_at: '',
    updated_at: '',
    isAdmin: false,
    isConnected: false,
    error: null
  }
}