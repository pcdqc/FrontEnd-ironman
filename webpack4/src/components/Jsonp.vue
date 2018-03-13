<template>
  <div class="jsonp">{{name}}</div>
</template>
<style>

</style>
<script>
  export default  {
    name: 'jsonp',
    data () {
      return  ({
        name: 'jsonp'
      })
    },
    created () {
      this.createJS('http://localhost:8888?query=WITH_SOME_DATA&callback=jsonpCallback');
      window.jsonpCallback = function(data){
        alert(data.name);
        console.log('11111')
      }
      var arr = [],
        max = 1000;
      for (var i = 1; arr.push(i++) < max;);

      var mapArr = [],forEachArr = [],forArr = [];

      console.time('map');
      arr.map(function (val) {
        mapArr.push(val);
      })
      console.timeEnd('map');


      console.time('forEach');
      arr.forEach(function (val) {
        forEachArr.push(val);
      })
      console.timeEnd('forEach');


      console.time('for');
      for (var i = 0; i < arr.length; i++) {
        forArr.push(arr[i]);
      }
      console.timeEnd('for');
    },
    methods: {
      createJS(sUrl) {
        // var oScript = document.createElement('script');
        // oScript.type = 'text/javascript';
        // oScript.src = sUrl;
        // document.getElementsByTagName('head')[0].appendChild(oScript);

        var img = document.createElement('img');
        // oScript.type = 'text/javascript';
        img.src = sUrl;
        document.getElementsByTagName('head')[0].appendChild(img);
        img.onload = function(data){
          console.log(data)
        }
        img.error = function(err){
          console.log(err);
        }
      } 
    }
  }
</script>

