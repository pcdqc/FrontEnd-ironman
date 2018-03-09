<template>
  <div class="header">{{title}}</div>
</template>

<style lang="sass">
.header{
  width:px2percent(1000,1080);
  height:85px;
  background-color:brown;
  text-align:center;
}
</style>

<script>
  export default {
    name: 'c-header',
    data () {
      return {
        title: 'I am a header'
      }
    }
  }
</script>
