'use strict'
const Readable = require('stream').Readable

class ToReadable extends Readable {
  constructor(iterable) {
    super()
    this.iterator = new function *() {
      yield * iterable
    }
  }

  _read() {
    const res = this.iterator.next()
    if (res.done) {
      //数据源已枯竭,调用`push(null)`通知流
      this.push(null)
    } else{
      this.push(res.value  + '\n')
    }
  }
}

module.exports = ToReadable