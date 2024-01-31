import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createAuthLoginValidator, createAuthRegisterValidator } from '#validators/auth_validator'

export default class AuthController {
  public async me({ auth, response }: HttpContext) {
    const user = auth.use("web").user
    return response.json({
      isConnected: !!user,
      user: user,
    })
  }

  public async logout({ auth }: HttpContext) {
    await auth.use("web").logout()
    return { message: "Logout success" }
  }

  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(createAuthLoginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use("web").login(user)

    return response.json({
      isConnected: !!user,
      user: user,
    })
  }

  public async register({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(createAuthRegisterValidator)
    const user = await User.create(data)
    await auth.use("web").login(user)

    return response.json({
      isConnected: !!user,
      user: user,
    })
  }
}
