var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/ips/:subnetId', function(req, res, next) {
  db.query("Select id,ipAddress,isReserved,note from `sl_ips` where `subnetId`=?", [req.params.subnetId], (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
