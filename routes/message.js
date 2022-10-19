const express = require("express");
const router = express.Router();
// database
let pool = require("../config/mysql");

router.get("/", async function (req, res) {
    
    let sql = `SELECT * FROM Message`;
	let [results] = await pool.query(sql, []);
	res.send({ error: false, data: results, message: "place list." });
});

router.post('/', async function (req, res) {
    
    const { eventId, userId, content, time } = req.body;
    const connection = await pool.getConnection();

    let insert_sql = `INSERT INTO Message (event_id, user_id, content, time) VALUES (?,?,?,?)`

    try {

        let [{ insertId, affectedRows: insert_affected_rows }] = await connection.query(insert_sql, [eventId, userId, content, time]);

        if (insert_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: false, msg: "Failed to create message" });
            return;
        }

        res.json({
            status: true,
            msg: "success!",
            data: { id : insertId }
        });
        
    } catch (error) {
        await connection.rollback();
        res.json({
            status: false,
            msg: error.message,
            error,
        });

    }
})

module.exports = router