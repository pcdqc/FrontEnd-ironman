<template>
  <div class="main-content">
    <c-header></c-header>
    <div class="content">{{name}}</div>
    <c-footer></c-footer>
  </div>
</template>
<style>
.main-content{
  background-color:aqua;
  width:100%;
  height:500px;
}
</style>
<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
console.log(Header)
export default {
  name: "app",
  data () {
    return {
      name: 'Vue'
    }
  },
  components: {
    'c-header': Header,
    'c-footer':Footer
  }
}
</script>

