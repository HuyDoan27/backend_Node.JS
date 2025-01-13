const connection = require("../config/database")

const getAllUsers = async () => {
    const [results] = await connection.query(`SELECT * FROM Users`);
    return results;
}

const getUserById = async (userId) => {
    let [results] = await connection.query(`SELECT * FROM Users Where id = ?`, [userId]);
    let user = results && results.length > 0 ? results[0] : {}

    return user
}

const updateUserById = async (email, name, city, userId) => {
    let [results, fields] = await connection.query(
        `Update Users
         SET email = ? , name = ? , city = ?
         Where id = ?`, 
         [email, name, city, userId]
    );
}

const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        `Delete From Users where id = ?`, [id]
    );
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById

}