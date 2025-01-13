const connection = require('../config/database');
const {getAllUsers, getUserById, updateUserById, deleteUserById} = require('../services/CRUD')

const getHomepage = async (req, res) => {      
    let results = await getAllUsers(); 
    res.render('home.ejs', { data: results });  
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getTest = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    let [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city]
    );

    console.log(results)
    res.redirect('/')
}

const getCreatePage = (req, res) =>{
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) =>{
    const userId = req.params.id
    let user = await getUserById(userId);
    res.render('update.ejs', {userEdit : user})
}

const postUpdateUser = async (req, res) => {
    let userId = req.body.userId
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    updateUserById(email,name,city,userId)
    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId);
    res.render('delete.ejs', {userEdit : user})

}

const postHandleRemoveUser = async (req, res) => {
    let id = req.body.userId
    await deleteUserById(id)
    res.redirect('/')
}

module.exports = {
    getHomepage,
    getABC,
    getTest,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}