<template>
  <div class="footer">{{title}}</div>
</template>

<style lang="sass">
.footer{
  position:absolute;
  bottom:0;
  left:0;
  width:px2percent(1000,1080);
  height:85px;
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
