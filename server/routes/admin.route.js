const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');
const adminController = require('../controllers/admin.controller');

router.get('/', adminController.home);
router.get('/shows', adminController.getAllShows);
router.post('/shows', adminController.createShow);
router.delete('/deleteShows/:showId', adminController.deleteShow);
router.put('/editShows/:showId', authMiddleware.validToken, adminController.editShow);

module.exports = router;


