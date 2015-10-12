var should = require('should');
var simple = require('simple-mock');
var Device = require('../lib/device');
var Channel = require('../lib/channel');
var EventEmitter = require('events');

describe('Device', function() {
  var bus, device;

  beforeEach(function() {
    bus = {};
    device = new Device(bus, 1, 20);
  });

  it('should create instance', function() {
    should(device).have.properties({
      id: 20,
      bus: bus,
      subnet: 1
    });
  });

  it('should inherit from event emitter', function() {
    should(device).be.an.instanceOf(EventEmitter);
  });

  it('should send command to bus', function(done) {
    var data = { channel: 1, level: 100 };
    var send = simple.mock(bus, 'send').callback();

    device.send(0x0031, data, function(err) {
      should(send.callCount).equal(1);
      should(send.lastCall.args[0]).equal(device);
      should(send.lastCall.args[1]).eql(0x0031);
      should(send.lastCall.args[2]).equal(data);

      done(err);
    });
  });

  describe('channel', function() {
    var channel;

    beforeEach(function() {
      channel = device.channel(1);
    });

    it('should initialize channel', function() {
      should(channel).be.an.instanceOf(Channel);
      should(channel).have.properties({
        number: 1,
        device: device
      });
    });

    it('should cache channel object', function() {
      should(device.channel(1)).equal(channel);
    });
  });
});