var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/events', function(req, res, next) {
  db.query("Select * from sl_events order by modifyDate desc", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
