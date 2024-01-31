import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'Ce champs est requis !',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'Ce champs doit être une adresse email valide',
  'minLength': 'Ce champs doit contenir au moins {{ min }} caractères',
  'maxLength': 'Ce champs doit contenir au plus {{ max }} caractères',
  'password.confirmed': 'Les mots de passe ne correspondent pas',
  'number': 'Ce champs doit être un nombre',
  'integer': 'Ce champs doit être un entier',
  'float': 'Ce champs doit être un nombre décimal',
})
