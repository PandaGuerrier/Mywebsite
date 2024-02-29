import type { HttpContext } from '@adonisjs/core/http'
import { createContactValidator } from '#validators/contact'
import axios from 'axios'

export default class ContactsController {
  public async create({ request, response }: HttpContext) {
     const data = await request.validateUsing(createContactValidator)

    await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
      content: `<@670642326661496866> New contact request from ${data.name} (${data.email})\n\nSubject: ${data.subject}\nMessage:\n\n\`\`\`${data.message}\`\`\``
    })

    return response.ok({ message: 'Contact request sent successfully' })
  }
}
