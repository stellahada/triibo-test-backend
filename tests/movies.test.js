require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');

describe('Fluxo Completo de Filmes (CRUD)', () => {
    let token;
    let movieId; // guarda o ID do filme criado

    beforeAll(async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'teste@triibo.com', 
                password: '123'            
            });
        
        token = res.body.token;
    });

    // criar
    it('Deve criar um novo filme', async () => {
        const res = await request(app)
            .post('/api/movies')
            .set('Authorization', `Bearer ${token}`) // Envia o token
            .send({
                title: 'Gladiator', 
                description: 'Um general romano que virou escravo',
                year: '2000'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id'); // Verifica se retornou um ID
        expect(res.body.title).toEqual('Gladiator');
        
        movieId = res.body.id;
    });

    // buscar
    it('Deve listar os filmes e encontrar o que criamos', async () => {
        const res = await request(app)
            .get('/api/movies')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true); 
        
        // Verifica se o ID do filme está na lista
        const movieFound = res.body.find(m => m.id === movieId);
        expect(movieFound).toBeTruthy();
    });

    // editar
    it('Deve atualizar o título do filme', async () => {
        const res = await request(app)
            .put(`/api/movies/${movieId}`) // Usa o ID salvo
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Gladiator 2'
            });

        expect(res.statusCode).toEqual(200);
    });

    // deletar
    it('Deve deletar o filme', async () => {
        const res = await request(app)
            .delete(`/api/movies/${movieId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    // confirmar deleção
    it('O filme não deve mais existir na lista', async () => {
        const res = await request(app)
            .get('/api/movies')
            .set('Authorization', `Bearer ${token}`);

        const movieFound = res.body.find(m => m.id === movieId);
        expect(movieFound).toBeUndefined(); // Não deve achar nada
    });
});