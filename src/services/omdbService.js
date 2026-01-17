const axios = require('axios');

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const fetchMovieData = async (title) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        t: title,
      },
    });

    // caso não encontre o filme
    if (response.data.Response === 'False') {
        return null;
    }

    return response.data;

  } catch (error) {
    console.error('Erro ao encontrar o filme', error.message);
    throw new Error('Falha na comunicação com a API do OMDB');
  }
};

module.exports = { fetchMovieData };