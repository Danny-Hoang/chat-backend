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

module.exports = router;