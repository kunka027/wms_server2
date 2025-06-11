const express = require('express');
const router = express.Router();

const {signin, signup, getUser, getProfile } = require('../controllers/userController');
const { getCustomer } = require('../controllers/customerController');
const { getWarehouse, saveWarehouse, deleteWarehouse } = require('../controllers/warehouseController');
// Route for user login
router.post('/auth/signin', signin);

// Route for user signup
router.post('/auth/signup', signup);

router.get('/customer', getCustomer);

router.get('/warehouse', getWarehouse);
router.put('/warehouse', saveWarehouse);
router.delete(`/warehouse/:_id`, deleteWarehouse);

module.exports = router;

