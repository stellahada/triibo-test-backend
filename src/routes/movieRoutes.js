const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Aplica o middleware de autenticação a todas as rotas abaixo

router.post('/movies', movieController.create);
router.get('/movies', movieController.list);
router.put('/movies/:id', movieController.update);
router.delete('/movies/:id', movieController.delete);

module.exports = router;
