#!/usr/bin/env coffee

_ = require 'lodash'
os = require 'os'

dgram = require 'dgram'

console.log "everything:\n", os.networkInterfaces()

_(os.networkInterfaces())
.each (iface, name) ->
  _(iface)
  .filter (address) ->
    not address.internal
  .filter (address) ->
    if address.family == 'IPv4'
      true
    else if address.family == 'IPv6'
      ip = _(address.address.split(':')).join('')
      mac = _(address.mac.split(':')).join('')
      _.endsWith ip, mac
    else
      false
  .each (address) ->
    address.interace = name
    console.log address
  .value()
.value()

console.log "hostname:", os.hostname()

sock = dgram.createSocket 'udp4'

message =
  host: os.hostname()
json = JSON.stringify message, null, 2

sock.send json, 0, json.length, 13579, '127.0.0.1', (error) ->
  if error?
    console.error "Error: #{error}\n#{error.stack}"
  else
    console.log "Message written."
  sock.close()

