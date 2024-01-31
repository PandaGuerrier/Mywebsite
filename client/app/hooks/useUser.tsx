import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getNulledUser, User } from '@/types/User'
import { getClientSession } from '@/functions/getClientSession/getClientSession'

export const UserContext = createContext({
  user: getNulledUser(),
  setUser: (user: User) => {
  }
})

export function UserProvider({children}: {
  children: ReactNode
}) {
  const [user, setUser] = useState(getNulledUser())

  useEffect(() => {
    (async () => {
          const userApi = await getClientSession()
          if (userApi) {
            setUser(userApi)
          }
        }
    )()
  }, [])

  return (
      <UserContext.Provider value={{
        user,
        setUser: setUser
      }}>
        {children}
      </UserContext.Provider>
  )
}