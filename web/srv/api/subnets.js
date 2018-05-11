var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/subnets', function(req, res, next) {
  db.query("Select id,networkIdentifier,cidr,subnetType,addressSpace,note,networkVlanId,netmask,gateway,modifyDate,totalIpAddresses,usableIpAddressCount from sl_subnets", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
