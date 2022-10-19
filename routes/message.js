const express = require("express");
const router = express.Router();
// database
let pool = require("../config/mysql");

router.get("/:event_id", async function (req, res) {
    let { event_id } = req.params;
    let sql = `SELECT m.id, m.time, m.content, e.title, u.username, u.avatar, u.email FROM Message m
        INNER JOIN Event e ON m.event_id = e.id
        INNER JOIN User u ON m.user_id = u.id
        WHERE e.id = ?
    `;
	let [results] = await pool.query(sql, [event_id]);
	res.send({ error: false, data: results, message: "message list." });
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