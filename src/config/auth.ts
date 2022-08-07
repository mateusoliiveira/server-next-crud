export default {
  jwt: {
    secret: process.env.APP_SECRET || 'HIGHLEVELSECRET',
    expiresIn: '30d'
  }
}
