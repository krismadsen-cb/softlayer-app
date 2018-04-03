var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/api/devices', function(req, res, next) {
  db.query("Select id, fqdn, type, status, powerState_keyName, ip, os, monthly_cost, inboundBandwidthUsage, outboundBandwidthUsage, inboundPublicBandwidthUsage, outboundPublicBandwidthUsage, notes, locationPath, provisionDate, modifyDate, datacenterName, regionalGroup_name, publicIp, privateNetworkOnlyFlag, networkVlanCount, vlan0_name, vlan0_number, vlan1_name, vlan1_number, vlan2_name, vlan2_number, processorCount, cores, memoryCount, memory, hardDriveCount, raidControllerCount from sl_servers", (err, rows, fields) => {
    return res.json(rows);
  });
});

module.exports = router;
