const express = require('express');

const router = express.Router();
const jwtAuth = require('../util/jwtAuth');

const indexController = require('../controllers/indexController');
const usersController = require('../controllers/usersController');
const users2Controller = require('../controllers/users2Controller');
const authController = require('../controllers/authController');

//////////// ROTAS //////////////

router.get('/', indexController.index);

router.post('/api/auth', authController.authenticate);
router.post('/api/validateToken', authController.validateToken);

router.get('/postgres/users', usersController.index);
router.get('/postgres/users/:id', jwtAuth, usersController.show);
router.post('/postgres/users', jwtAuth, usersController.store);
router.put('/postgres/users/:id', jwtAuth, usersController.update);
router.delete('/postgres/users/:id', jwtAuth, usersController.destroy);

router.get('/mongo/users', users2Controller.index);
router.get('/mongo/users/:id', jwtAuth, users2Controller.show);
router.post('/mongo/users', jwtAuth, users2Controller.store);
router.put('/mongo/users/:id', jwtAuth, users2Controller.update);
router.delete('/mongo/users/:id', jwtAuth, users2Controller.destroy);

/////////////////////////////////

module.exports = router;