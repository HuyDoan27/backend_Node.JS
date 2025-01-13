const connection = require('../config/database');

const initAPIRoute = async (req, res) => {
    const [results] = await connection.query(`SELECT * FROM Users`);

    res.json({
        message : "ok",
        data : results
    })
}

const createNewUser = async (req, res) => {
    try {
        const { email, name, city } = req.body;

        // Kiểm tra tham số
        if (!email || !name || !city) {
            return res.status(400).json({ // Thêm `return` để kết thúc luồng xử lý
                message: "missing required params"
            });
        }

        // Chèn dữ liệu vào bảng Users
        await connection.query(
            `INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city]
        );

        res.json({
            message: "ok"
        });
    } catch (error) {
        res.status(500).json({ message: "Error inserting data", error });
    }
}

const updateUser = async (req, res) => {
    try {
        let { email, name, city } = req.body;
        let userId = req.params.id

        // Kiểm tra các trường bắt buộc
        if ( !email || !name || !city ) {
            console.log("Missing required parameters");
            return res.status(400).json({ message: "Missing required parameters" });
        }

        console.log("All required parameters provided");

        // Thực hiện cập nhật
        const [result] = await connection.query(
            `UPDATE Users
             SET email = ?, name = ?, city = ?
             WHERE id = ?`,
            [email, name, city, userId]
        );

        // Kiểm tra số dòng bị ảnh hưởng
        if (result.affectedRows === 0) {
            console.log("No rows updated, user not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Update successfully");
        res.json({ message: "Update successful" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const deleteuser = async (req, res) => {
    res.json({
        message: "ok"
    });
}

module.exports = {
    initAPIRoute,
    createNewUser,
    updateUser,
    deleteuser
}