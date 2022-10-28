const express = require("express");
const router = express.Router();
// database
let pool = require("../config/mysql");

router.get("/recent", async function (req, res) {
    let sql = `SELECT e.id, e.title, e.start_time, e.end_time FROM Event e
        WHERE 1
        ORDER BY e.start_time
        LIMIT 10 
    `;
	let [results] = await pool.query(sql, [event_id]);
	res.send({ error: false, data: results, message: "chat room list." });
});

// route temp
router.get("/:userId", async function (req, res) {
    const userId = req.params.userId
    let sql = `SELECT d.id, d.title, u.username, c2.event_id, c2.content, c2.maxtime FROM Event d LEFT JOIN 
    (
                SELECT user_id,
                       content,
                       event_id,
                       MAX(time) AS maxtime
                FROM Message
                GROUP BY event_id
            ) c2
                ON c2.event_id = d.id
        LEFT JOIN User u
            ON c2.user_id = u.id
    WHERE ? = ?
    `;
	let [results] = await pool.query(sql, [userId, userId]);
	res.send({ error: false, data: results, message: "chat room list." });
});

module.exports = router;