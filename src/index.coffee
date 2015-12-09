#!/usr/bin/env coffee
require 'log-a-log'

_ = require 'lodash'
Q = require 'q'

FS = require 'fs'
dgram = require 'dgram'

port = 13579

sock = dgram.createSocket 'udp4'
#sock.bind port, ->
#  console.log "Binding port..."

sock.on 'listening', ->
  address = sock.address()
  console.log "Listening on #{address.family} #{address.address}:#{address.port}"

sock.on 'close', ->
  console.log "Socket closed."

sock.on 'error', (error) ->
  console.log "Error: #{error}\n#{error.stack}"

sock.on 'message', (message, client) ->
  console.log "received message from #{client.address}:#{client.port} : #{message}"

sock.bind port

