const express = require('express');
const router = express.Router();
const {initAPIRoute, createNewUser, updateUser, deleteuser} = require("../controllers/APIController")

router.get('/users', initAPIRoute)

router.post('/create-user',createNewUser)

router.put('/update-user/:id', updateUser)

router.delete('/delete-user', deleteuser)
module.exports = router