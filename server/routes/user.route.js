const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', userController.me );
router.get('/adminShows', userController.getAdminShows);
router.post("/takeTicket/:showId", userController.takeTicket); 
router.put("/takeTicket", userController.putTicket); 
router.delete('/deleteTicket/:ticketId', userController.deleteTicket);

module.exports = router;
