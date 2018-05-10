var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/security/assets', function(req, res, next) {
  db.query("Select id, hostName, ip, os, lastScan, assessedForPolicies, assessedForVulnerabilities, rawRiskScore from ivm_assets", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
