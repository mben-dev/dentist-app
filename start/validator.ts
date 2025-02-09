import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    required: ' {{ field }} est requis',
    // string: 'The value of {{ field }} field must be a string',
    email: "Le format de l'adresse email est incorrect",
    minLength: '{{field}} doit contenir au moins 8 caractères',
  },
  {
    password: 'la Mot de passe',
    password_confirmation: 'La confirmation du mot de passe',
  }
)
