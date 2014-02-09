
/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function recursiveCheckForBinary(obj) { 
    if (!obj) return false;

    if ( (global.Buffer && Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer)) {
      return true;
    }

    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (recursiveCheckForBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      for (var key in obj) {
        if (recursiveCheckForBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return recursiveCheckForBinary(data);
}
