var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/tickets', function(req, res, next) {
  db.query("Select * from sl_tickets", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
