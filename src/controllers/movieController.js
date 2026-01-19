const db = require('../config/firebase');
const { fetchMovieData } = require('../services/omdbService');

const collection = db.collection('movies'); // Referência à coleção "filmes" no banco

const movieController = {
    async create(req, res) {
        try {
            const { title, description, year } = req.body;

            if (!title) {
                return res.status(400).json({ error: 'Titulo é obrigatório.' });
            }

            let externalData = {};
            try {
                externalData = await fetchMovieData(title);
            } catch (error) {
                console.log('Aviso; não foi possível buscar dados externos do filme, seguindo apenas com dados manuais');
            }


            //  o objeto final, com dados do usuário e da API 
            const newMovie = {
                title,
                description: description || 'Sem descrição',
                year: year || externalData?.Year || 'N/A', // Usa o ano do usuário ou da API
                director: externalData?.Director || 'Desconhecido',
                poster: externalData?.Poster || null,
                createdAt: new Date().toISOString()
            };

            // Salvando no Firebase
            const docRef = await collection.add(newMovie);

            return res.status(201).json({
                message: 'Filme cadastrado com sucesso',
                id: docRef.id,
                ...newMovie
            });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao cadastrar o filme' + error.message });
        }
    },

    //listar filmes
    async list(req, res) {
        try {
            const snapshot = await collection.get();
            const movies = [];

            snapshot.forEach(doc => {
                movies.push({ id: doc.id, ...doc.data() });
            });

            return res.status(200).json(movies);

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar filmes. ' });
        }
    },

    // editar
    async update(req, res) {
        try { 
            const { id } = req.params; // pega o id da url
            const dataToUpdate = req.body;

            // verifica se o filme existe
            const docRef =collection.doc(id);
            const doc = await docRef.get();

            if(!doc.exists) {
                return res.status(404).json({ error: 'Filme não encontrado.' });
            }

            await docRef.update(dataToUpdate);

            return res.status(200).json({ message: 'Filme atualizado com sucesso.' });

        } catch(errot) {
            return res.status(500).json({error: 'Erro ao atualizar o filme.' });
        }
    },

    // deletar
    async delete(req, res) {
        try {
            const { id } = req.params;
            await collection.doc(id).delete();

            return res.status(200).json({ message: 'Filme deletado com sucesso.' });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o filme.' });
        }
    }
};

module.exports = movieController;