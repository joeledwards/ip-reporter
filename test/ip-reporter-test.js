const _ = require('lodash');
const Q = require('q');
const FS = require('fs');
const os = require('os');
const assert = require('assert');

const reporter = require('../src/index');

describe( "reporter", => {
  it("should report the IP address to the file test/ip.json", (done) => {
    var ipFile = 'test/ip.json';
    var realIp = _(os.networkInterfaces()).first();

    try {
      if (FS.existsSync(ipFile)) {
        FS.unlinkSync(ipFile);
      }

      ipReporter.report(ipFile)
      .then((outFile) => Q.nfcall(readFile, ipFile, 'utf-8'))
      .then((fileString) => JSON.parse(fileString))
      .then((json) => assert equal(json.ip, realIp))
      .catch((error) => {
        console.log("error:", error, "\nstack:\n", error.stack)
        done error
      })
      .fin(=> done());
    }
    catch (error) {
      done error
    }
  });
});
