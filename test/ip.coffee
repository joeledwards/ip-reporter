#!/usr/bin/env coffee

_ = require 'lodash'
os = require 'os'

external = []

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

