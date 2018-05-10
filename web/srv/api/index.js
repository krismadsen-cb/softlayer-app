var devices = require('./devices');
var events = require('./events');
var security = require('./security');
var tickets = require('./tickets');

var api = {
  'devices': devices,
  'events': events,
  'security': security,
  'tickets': tickets
};

module.exports = api;
