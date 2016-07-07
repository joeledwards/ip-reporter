require('log-a-log');

const _ = require('lodash');
const Q = require('q');
const uuid = require('uuid');
const crypto = require('crypto');
const logger = require('winston');
const needle = require('needle');
const levelup = require('levelup');

// Fetch our gateway IP from an IP reporter service.
function getPublicIp() {
  Q({});
}

// Fetch all local interface info.
function getInterfaces() {
  Q({});
}

// Run the network check.
function checkNetwork() {
  getPublicIp()

  .then((ip) => {
    return getInterfaces().then((interfaces) => {
      return {
        interfaces: interfaces,
        public_ip: ip,
      };
    });
  })

  .then((info) => {
    // TODO:
    // - check with database
    // - report to IP service
  })

  .catch(error) => {
    logger.error('Error fetching networking info:', error);
  })

  .fin(() => setTimeout(checkNetwork, 60000));
}

