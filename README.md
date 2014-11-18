# hmac

pure js hmac that can be used with any create hash function.

## example

``` js
var Blake2s = require('blake2s')
function createBlake2s () {
  return new Blake2s()
}
var createHmac = require('hmac')
  .bind(null, createBlake2s, 64)

var hmac = createHmac('key 123')

var mac = hmac.update('foo', 'utf8').digest('hex')
```



## License

MIT
