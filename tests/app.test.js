const request = require('supertest');
const app = require('../src/app'); 

describe('Teste da API', () => {
    // verifica se a rota inicial está funcionando
    it('Deve responder na rota raiz com status 200', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message', 'API Triibo funcionando!')
    })

    // verifica a segurança 
    it('Deve negar acesso a rotas protegidas sem token', async () => {
        const res = await request(app).get('/api/movies')
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Token não fornecido.')
    })

    // verifica a validação dos dados 
    it('Não permitir cadastro de usuário sem senha', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'teste@semsenha.com'
            });
        expect(res.statusCode).toEqual(400);
    })

})
