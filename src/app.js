const express = require('express')
const app = express();
const movieRoutes = require('./routes/movieRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(express.json());

app.get('/', (req, res) => {
 res.status(200).json({ message: 'API Triibo funcionando!' })
});

app.use('/auth', authRoutes)
app.use('/api', movieRoutes) // todas as rotas começarão com /api

module.exports = app