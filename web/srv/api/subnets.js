var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/subnets', function(req, res, next) {
  db.query("Select id,networkIdentifier,netmask,gateway,vlanName,subnetType,addressSpace,note,totalIpAddresses,usableIpAddressCount from sl_subnets", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
