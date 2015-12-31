const _ = require('lodash');
const os = require('os');
const request = require('request');

//console.log("everything:\n", os.networkInterfaces());

_(os.networkInterfaces())
.each((iface, name) => {
  _(iface)
  .filter((address) => !address.internal)
  .filter((address) => {
    if (address.family == 'IPv4') {
      return true;
    }
    else if (address.family == 'IPv6') {
      var ip = _(address.address.split(':')).join('');
      var mac = _(address.mac.split(':')).join('');
      return _.endsWith(ip, mac);
    }
    else {
      return false;
    }
  })
  .map((address) => {
    address.interface = name;
    console.log(address);
    return address;
  })
  .value()
})
.value();

console.log("hostname:", os.hostname());

var options = {
  uri: 'http://localhost:13579/ip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({address: "10.0.0.169"})
};

request(options, (error, response, body) => {
  if (error) {
    return console.error(`Error with post request: ${error}`)
  }

  console.log("Request completed.");
});

