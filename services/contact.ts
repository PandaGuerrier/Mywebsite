import api from '@/services/api'

export default async function sendContactForm(name: string, email: string, subject: string, message: string): Promise<boolean> {
  const response = await api.post('', {
    content: "@everyone, someone has sent a contact request: \n\n" + "Name: " + name + "\nEmail: " + email + "\nSubject: " + subject + "\nMessage: " + message,
  })

  return response.status === 200;
}