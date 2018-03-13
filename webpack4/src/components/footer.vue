<template>
  <div class="footer">{{title}}</div>
</template>

<style lang="scss">
.footer{
  position:fixed;
  bottom:0;
  left:0;
  width:px2percent(1000,1080);
  height:30px;
  background-color:brown;
  text-align:center;
}
</style>

<script>
  export default {
    name: 'c-footer',
    data () {
      return {
        title: 'I am a footer'
      }
    }
  }
</script>
