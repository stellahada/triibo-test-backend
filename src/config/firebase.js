const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

// Verifica se já existe um app inicializado para evitar erro de duplicidade
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

console.log("Firebase conectado")

module.exports = db