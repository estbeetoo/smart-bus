var { encoder } = require('./panel_control');

exports.parser = function(data) {
  return {
    parameter: data.readUInt8(0),
    value: data.readUInt8(1),
    time: data.readUInt8(2),
    extra: data.length === 4 ? data.readUInt8(3) : undefined
  };
};

exports.encoder = encoder;
