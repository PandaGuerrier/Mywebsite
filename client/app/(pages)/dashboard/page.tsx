'use client'
import { getClientSession } from '@/functions/getClientSession/getClientSession'

const Dashboard = () => {

  const handleSubmit = async () => {

    const { user } = await getClientSession()

    alert(JSON.stringify(user))
  }

  return (
    <button className="border bg-gray-700 text-gray-100" onClick={() => handleSubmit()}> get authenticated user </button>
  )
}

export default Dashboard