/*
 * Module requirements.
 */

var isArray = require('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data (ArrayBuffer, Buffer, Blob, and File).
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      return function() {
        for (var i = 0; i < obj.length; i++) {
          var result = _hasBinary(obj[i]);
          while(isfun(result)) result = result();
          if (result) return true;
        }

        return false;
      }
    } else if (obj && 'object' == typeof obj) {
      return function() {
        if (obj.toJSON) {
          obj = obj.toJSON();
        }

        for (var key in obj) {
          var result = _hasBinary(obj[key]);
          while (isfun(result)) result = result();
          if (result) return true;
        }

        return false;
      }
    }

    return false;
  }

  // trampoline
  var result = _hasBinary(data);
  while (isfun(result)) {
    result = result();
  }
  return result;
}

function isfun(x) {
  return typeof x === 'function';
}
