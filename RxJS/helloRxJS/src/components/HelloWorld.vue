<template>
  <div class="hello">
    <button>Click Me!</button>
    <div class="example2"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted () {
    // var button = document.querySelector('button');
    // // button.addEventListener('click', () => 
    // //   console.log('clicked!')
    // // )
    let Rx = this.Rx;
    // Rx.Observable.fromEvent(button, 'click')
    //   .throttleTime(1000)
    //   .scan( count => count+1, 0) //与数组的reduce类似。需要一个暴露给回调函数当参数的初始值。每次调用函数运行后的返回值
    //   //会作为下次回调函数运行时的参数
    //   .subscribe( count => console.log(`${count} times clicked!`));

    // /**
    //  * 值 对于流经observales的值 ，你可以对其进行转换
    //  */
    // var btn2 = document.querySelector('.example2')
    // Rx.Observable.fromEvent(btn2, 'click')
    //   .map(event => event.clientX)
    //   .scan( (count, clientX) => clientX, 0)
    //   .subscribe( count => console.log(count));
    // /**
    //  * Observale(可观察对象)
    //  * 是多个值的惰性推送集合。
    //  * 	 单个值	    多个值
    // 拉取	Function	Iterator
    // 推送	Promise	  Observable
    //  */
    // var observable = Rx.Observable.create(function (observer) {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   setTimeout( () => {
    //     observer.next(4);
    //     observer.complete();
    //   },1000);
    // });
    // // console.log('just before subscrible')
    // // observable.subscribe({
    // //   next: x => {console.log('got value' + x);if(x==4) throw new Error('111')},
    // //   error: err => console.error('something wrong occurred:' + err),
    // //   complete: () => console.log('done'),
    // // });
    // // console.log('after subscrible')


    // var foo = Rx.Observable.create(function (observer) {
    //   console.log('Hello')
    //   observer.next(42)
    // })
    // // foo.subscribe(function (x) {
    // //   console.log(x);
    // // })
    // // foo.subscribe(function (y) {
    // //   console.log(y);
    // // })

    // var observable1  = Rx.Observable.create(function subscribe(observer) {
    //   var id = setInterval( () => {
    //     observer.next('Hi')
    //   },1000)
    // });
    // //subscrible调用是启动"Observable执行"的一种简单方式，并将值或事件传递给本次执行的观察者 
    // // 这个调用还返回一个对象 即Subscription(订阅)
    // var subscription = observable1.subscribe(x => console.log(x))
    // console.log(subscription)
    // setTimeout(() => {
    //   console.log(subscription)
    //   subscription.unsubscribe(); 
    // }, 3000);

    // var observable3 = Rx.Observable.interval(400);
    // var observable4 = Rx.Observable.interval(300);
    // 
    // var subscription = observable3.subscribe(x => console.log('first: ' + x));
    // var childSubscription = observable4.subscribe(x => console.log('second: ' + x));

    // subscription.add(childSubscription);

    // setTimeout( ()=>{
      // subscription.unsubscribe();
    // },1000)

    // var subject = new Rx.Subject();

    // subject.subscribe({
    //   next: (v) =>  console.log('observerA:' + v )
    // });

    // subject.subscribe({
    //   next: (v) => console.log('observerB:' + v )
    // })

    // subject.next(2);
    // subject.next(3)

    var source = Rx.Observable.interval(500);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);
    var subscription1, subscription2, subscriptionConnect;
    subscription1 = multicasted.subscribe({
      next: (v) => { console.log('objserverA: ') + v}
    });

    //这里我们应该调用'connect',因为multicated的第一个订阅者关心消费值
    subscriptionConnect = multicasted.connect();

    setTimeout( () => {
      subscription2 = multicasted.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });
    }, 600);

    setTimeout( () => {
      subscription1.unsubscribe();
    },1200);

    // 这里我们应该取消共享的Observable执行的订阅，
    // 因此以后multicasted将不再有订阅者
    setTimeout( () => {
      subscription2.unsubscribe();
      subscriptionConnect.unsubscribe(); //用于共享的Observable执行
    },2000)
  }

  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.example2{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
