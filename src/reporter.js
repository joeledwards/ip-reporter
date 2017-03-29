require('log-a-log');

const _ = require('lodash');
const P = require('bluebird');
const os = require('os');
const uuid = require('uuid');
const crypto = require('crypto');
const logger = require('winston');
const needle = require('needle');
const levelup = require('levelup');

// Fetch our gateway IP from an IP reporter service.
function getPublicIp() {
  return P.promisify(needle.get)('http://api.ipify.org?format=json')
  .then(response => response.body)
  .then(({ip}) => ip);
}

// Fetch all local interface info.
function getInterfaces() {
  return P.resolve({
    hostname: os.hostname(),
    interfaces: os.networkInterfaces(),
  });
}

// Run the network check.
function checkNetwork() {
  getPublicIp()

  .then(ip => {
    return getInterfaces().then(({hostname, interfaces}) => {
      return {
        hostname,
        interfaces,
        public_ip: ip,
      };
    });
  })

  .then(info => {
    console.log(`IP Info:\n${JSON.stringify(info, null, 2)}`);
    // TODO:
    // - check with database
    // - report to IP service
  })

  .catch(error => {
    logger.error('Error fetching networking info:', error);
  })

  .finally(() => setTimeout(checkNetwork, 60000));
}

if (require.main === module) {
  checkNetwork();
} else {
  module.exports = {
    checkNetwork,
    getPublicIp,
    getInterfaces,
  };
}
