exports.parser = function(data) {
  return {};
};

exports.encoder = function(data) {
  var buffer = new Buffer(1);

  buffer.writeUInt8(data.switch, 0);

  return buffer;
};
