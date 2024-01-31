import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

export default api