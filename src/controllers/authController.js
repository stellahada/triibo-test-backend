const db = require('../config/firebase')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authController = {

    async register(req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' })
            }
            //criptografa a senha antes de salvar
            const hashedPassword = await bcrypt.hash(password, 10)

            await db.collection('users').add({
                email,
                password: hashedPassword
            })

            return res.status(201).json({ message: 'Usuário registrado com sucesso.' })

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao registrar usuário.' })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const userRef = db.collection('users')
            const snapshot = await userRef.where('email', '==', email).get();

            if (snapshot.empty) {
                return res.status(401).json({ error: 'Credenciais inválidas.' })
            }

            const userDoc = snapshot.docs[0]
            const user = userDoc.data()

            // compara as senhas criptografadas no banco
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Credenciais inválidas.' })
            }

            // Gera um token JWT
            const token = jwt.sign({
                id: userDoc.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '1h' }) // expira em 1 hora

            return res.json({ token})

        }catch (error) {
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }
            
    }
};

module.exports = authController;