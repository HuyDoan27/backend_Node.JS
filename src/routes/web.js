const express = require('express');
const router = express.Router();
const {getHomepage,getABC,getTest,postCreateUser, getCreatePage,getUpdatePage,postUpdateUser,postDeleteUser,postHandleRemoveUser} = require('../controllers/homeController')

router.get('/', getHomepage)

router.get('/abc',getABC)

router.get('/test', getTest )

router.get('/create', getCreatePage )

router.post('/create_user', postCreateUser)

router.get('/update/:id', getUpdatePage )

router.post('/update-user', postUpdateUser)

router.post('/delete-user/:id', postDeleteUser)

router.post('/delete', postHandleRemoveUser)
module.exports = router