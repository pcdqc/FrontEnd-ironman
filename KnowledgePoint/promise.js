try {
  module.exports = Promise
} catch (e) {}
// https://promisesaplus.com/#point-67 Promise标准

//最后，我们刚刚说到，原则上，promise.then(onResolved, onRejected)里的这两相函数需要异步调用，关于这一点，标准里也有说明：
// In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.
// 所以我们需要对我们的代码做一点变动，即在四个地方加上setTimeout(fn, 0)，这点会在完整的代码中注释，请各位自行发现。
// 事实上，即使你不参照标准，最终你在自测试时也会发现如果then的参数不以异步的方式调用，有些情况下Promise会不按预期的方式行为，通过不断的自测，最终你必然会让then的参数异步执行，让executor函数立即执行
function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {//立即调用
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  //
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) { // 对应标准2.3.1节
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {// 对应标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 即要判断它的类型，又要调用它，这就是两次读取
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') {// 2.3.3.3
        then.call(x, function rs(y) {// 2.3.3.3.1
          if (thenCalledOrThrow) return //2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)// 2.3.3.3.1
        }, function rj(r) {
          if (thenCalledOrThrow) return  // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true
      return reject(e)
    }
  } else { // 2.3.4
    resolve(x)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  /**解决值的穿透问题 */
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
    return v
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
    throw r
  }
  /**解决值的穿透问题 */
  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          //x.then(resolve, reject) 解决不同promise交互的问题 使用resolvePromise
          resolvePromise(promise2, x, resolve, reject)
          //promise2 为返回的Promise对象实例 x为resolve处理后的结果 这个resolve是用户自定义的
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'pending') {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (r) {
            reject(r)
          }
        })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}