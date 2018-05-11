var devices  = require('./devices');
var events   = require('./events');
var ips      = require('./ips');
var security = require('./security');
var subnets  = require('./subnets');
var tickets  = require('./tickets');

var api = {
  'devices': devices,
  'events': events,
  'ips': ips,
  'security': security,
  'subnets': subnets,
  'tickets': tickets
};

module.exports = api;
