const reporter =  require('./reporter');
const durations = require('durations');

let watch = durations.stopwatch().start();

reporter.getPublicIp()
.then(ip => {
  watch.stop();
  console.log(`Lookup took ${watch}; Public IP is: ${ip}`)
})
.catch(error => console.error('Error fetching public IP:', error))
.then(() => {
  watch.reset().start();
  return reporter.getInterfaces();
})
.then(net => {
  watch.stop();
  console.log(`Lookup took ${watch}; Network info:\n${JSON.stringify(net, null, 2)}`)
})
.catch(error => console.error('Error fetching network information:', error))
;
