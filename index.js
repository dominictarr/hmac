'use strict';
var zeroBuffer = new Buffer(128)
zeroBuffer.fill(0)

module.exports = Hmac

function Hmac (createHash, blocksize, key) {
  if(!(this instanceof Hmac)) return new Hmac(createHash, blocksize, key)

  this._opad = opad
  this._createHash = createHash

  if(blocksize !== 128 && blocksize !== 64)
    throw new Error('blocksize must be either 64 for or 128 , but was:'+blocksize)

  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

  if(key.length > blocksize) {
    key = this._createHash().update(key).digest()
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = this._ipad = new Buffer(blocksize)
  var opad = this._opad = new Buffer(blocksize)

  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = this._createHash().update(ipad)
}

Hmac.prototype.update = function (data, enc) {
  this._hash.update(data, enc)
}

Hmac.prototype.digest = function (enc) {
  var h = this._hash.digest()
  return this._createHash().update(this._opad).update(h).digest(enc)
}


