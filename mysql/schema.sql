CREATE DATABASE IF NOT EXISTS softlayer;
GRANT ALL ON softlayer.* to 'softlayer-demon'@'%';
USE softlayer;
CREATE TABLE IF NOT EXISTS sl_servers(
  typeId int,
  domain text,
  serialNumber text,
  modifyDate text,
  networkManagementIpAddress text,
  networkManagementIpPort int,
  consoleIpAddressRecord_port int,
  sshKeyCount int,
  networkMonitorCount int,
  publicIp text,
  privateNetworkOnlyFlag varchar(8),
  tagReferenceCount int,
  pod text,
  activeNetworkMonitorIncidentCount int,
  id int,
  accountId int,
  datacenterName text,
  powerSupplyCount int,
  location_name text,
  hostname text,
  hardwareStatusId int,
  recentEventCount int,
  inboundBandwidthUsage text,
  statusId int,
  rack_name text,
  networkMonitorIncidentCount int,
  processorCoreAmount int,
  memory int,
  inboundPublicBandwidthUsage text,
  type text,
  memoryCount int,
  outboundBandwidthUsage text,
  powerState_keyName text,
  status text,
  outboundPublicBandwidthUsage text,
  networkVlanCount int,
  vlan0_name text,
  vlan0_number int,
  vlan1_name text,
  vlan1_number int,
  vlan2_name text,
  vlan2_number int,
  regionalGroup_name text,
  monitoringServiceFlag varchar(8),
  inboundPrivateBandwidthUsage text,
  hardDriveCount int,
  softwareComponentCount int,
  networkCardCount int,
  virtualRackName text,
  raidControllerCount int,
  fqdn text,
  datacenter text,
  hourlyBillingFlag varchar(8),
  provisionDate text,
  monitoringAgentCount int,
  ip text,
  notes text,
  bareMetalInstanceFlag varchar(8),
  managedResourceFlag varchar(8),
  processorCount int,
  activeTransactionCount int,
  spare_hostname text,
  os text,
  operatingSystemReferenceCode text,
  networkComponentCount int,
  cores int,
  locationPath text,
  activeTicketCount int,
  hardwareFunctionDescription text,
  gateway VARCHAR(20),
  monthly_cost FLOAT,
  lastPatch text,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS sl_tickets(
  id INT,
  accountId VARCHAR(10),
  title TEXT,
  createDate TEXT,
  status_name VARCHAR(12),
  lastEditDate TEXT,
  lastResponseDate TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS sl_events(
  id INT,
  endDate TEXT,
  modifyDate TEXT,
  notificationOccurrenceEventType_keyName VARCHAR(20),
  recoveryTime TEXT,
  startDate TEXT,
  statusCode_name VARCHAR(20),
  subject TEXT,
  summary TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS ivm_assets(
  id INT,
  rawRiskScore FLOAT,
  assessedForPolicies VARCHAR(8),
  ip VARCHAR(18),
  hostName TEXT,
  assessedForVulnerabilities VARCHAR(8),
  os TEXT,
  lastScan TEXT,
  tags TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS sl_subnets(
  modifyDate TEXT,
  version INT,
  vlanName TEXT,
  isCustomerRoutable VARCHAR(8),
  usableIpAddressCount VARCHAR(25),
  id INT,
  note TEXT,
  netmask VARCHAR(128),
  broadcastAddress VARCHAR(18),
  isCustomerOwned VARCHAR(8),
  sortOrder VARCHAR(5),
  networkIdentifier VARCHAR(64),
  totalIpAddresses VARCHAR(25),
  cidr INT,
  gateway VARCHAR(64),
  addressSpace TEXT,
  subnetType TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS sl_ips(
  isNetwork VARCHAR(8),
  isBroadcast VARCHAR(8),
  isGateway VARCHAR(8),
  note TEXT,
  subnetId INT,
  ipAddress VARCHAR(64),
  id INT,
  isReserved VARCHAR(18),
  PRIMARY KEY (id),
  INDEX (subnetId)
);
CREATE TABLE IF NOT EXISTS linux_patching(
  ip TEXT,
  fqdn TEXT,
  hostname TEXT,
  os TEXT,
  server_type VARCHAR(45),
  environment VARCHAR(45),
  patchFlags VARCHAR(500),
  lastPatch datetime,
  INDEX (hostname)
);
