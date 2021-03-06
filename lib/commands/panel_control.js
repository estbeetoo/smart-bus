var { parser } = require('./response_panel_control');

exports.parser = parser;

exports.encoder = function(data) {
  var buffer = new Buffer(4);

  buffer.writeUInt8(data.parameter, 0);
  buffer.writeUInt8(data.value, 1);

  var time = data.time;

  buffer.writeUInt8(Math.floor(time / 256), 2);
  buffer.writeUInt8(time % 256, 3);

  return buffer;
};
