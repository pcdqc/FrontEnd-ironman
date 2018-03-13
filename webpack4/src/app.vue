<template>
  <div class="main-content">
    <c-header></c-header>
    <section>
      <h1>基本选择器</h1>
      <div id="example1">div example1,and i have a id selector</div>
      <div class="example2">div example2,and i hanve a class selector</div>
    </section> 

    <section class="multi">
      <h1>多元素选择器</h1>
      <div id="one">I am one of two</div>
      <div id="two">I am the other of the two</div>
      <div class="grandpa">
          grandpa
        <div class="parent">parent
          <div class="children">children</div>
        </div>
        <div class="uncle">uncle</div>
      </div>
    </section>

    <section class="attrSel">
      <h1>属性选择器</h1>
      <div asel="selector">darkblue</div>
      <div asel="selector selector1" asel1="selector1">属性选择器</div>
      <div asel="en-us" asel1="selector">属性中有'-',</div>
      <div asel="">darkblue</div>
      <div asel="other">darkblue</div>
    </section>
    
    <section  class="pseudo">
      <h1>伪类选择器</h1>
      <div >
        parent
        <div>children</div>
        <div>children</div>
        <div>lastChildren hover:red</div>
        <input type="focus red">
      </div>
    </section>
    <c-footer></c-footer>
    <section >
          <p>盒子的多个属性一起动画: width, height, background-color, transform. 将光标悬停在盒子上查看动画。</p>
          <div class="box"></div>
      <div class="sidebar">
        <p><a class="menuButton" href="home">Home</a></p>
        <p><a class="menuButton" href="about">About</a></p>
        <p><a class="menuButton" href="contact">Contact Us</a></p>
        <p><a class="menuButton" href="links">Links</a></p>
      </div>
      <div class="rainbow"></div>
    </section>
    <section >
      <div class="wrapper">
        <div class="one">One</div>
        <div class="two">Two</div>
        <div class="three">Three</div>
        <div class="four">Four</div>
        <div class="five">Five</div>
        <div class="six">Six</div>
      </div>
    </section>
    <section >
      <div class="ball-running"></div>
    </section>
    <c-JSONP></c-JSONP>
  </div>
</template>

<style lang="scss">
.ball-running {
  position:absolute;
  width:100px;
  background: gray;
  height:100px;
  animation: run 4s infinite;
}

@keyframes run {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(200px, 0);
  }
  50% {
    transform: translate(200px, 200px);
  }
  75% {
    transform: translate(0, 200px);
  }
}

著作权归作者所有。


//网格布局
.wrapper {
  max-width: 940px;
  margin: 0 auto;
}

.wrapper > div {
  border: 2px solid rgb(233,171,88);
  border-radius: 5px;
  background-color: rgba(233,171,88,.5);
  padding: 1em;
  color: #d9480f;
}.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column: 1 / 3;
  grid-row: 1;
}
.two { 
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.three {
  grid-row: 2 / 5;
  grid-column: 1;
}
.four {
  grid-column: 3;
  grid-row: 3;
}
.five {
  grid-column: 2;
  grid-row: 4;
}
.six {
  grid-column: 3;
  grid-row: 4;
}



.rainbow{
  border:1px solid black;
}
.rainbow:hover {
  animation: 1s rainbow 2 forwards;
}
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
.menuButton {
  position: relative;
  transition-property: background-color, color;
  transition-duration: 1s;
  transition-timing-function: ease-out;
  text-align: left;
  background-color: grey;
  left: 5px;
  top: 5px;
  height: 26px;
  color: white;
  border-color: black;
  font-family: sans-serif;
  font-size: 20px;
  text-decoration: none;
  box-shadow: 2px 2px 1px black;
  padding: 2px 4px;
  border: solid 1px black;
}

.menuButton:hover {
  position: relative;
  transition-property: background-color, color;
  transition-duration: 1s;
  transition-timing-function: ease-out;
  background-color:white;
  color:black;
  box-shadow: 2px 2px 1px black;
}
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition:width 2s, height 2s, 
        background-color 2s, -webkit-transform 2s;
    transition:width 2s, height 2s, background-color 2s, transform 2s;
}
.box:hover {
    background-color: #FFCCCC;
    width:200px;
    height:200px;
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
}
// 伪类选择器
.pseudo{
  div:first-child{
    color:goldenrod;
  }
  div:hover{
    background-color:red;
  }
  div:active{
    background:green;
  }
}
section{
  display:none;
}
section[isShow]{
  display:block;
}
// 属性选择器
.attrSel{
  div[asel="selector"]{
    color:firebrick;
  }
  div[asel~=selector1]{
    // E[att=val]
    // 匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素
    color:yellowgreen;
  }
  div[asel|=en]{
    // E[att|=val]
    // 匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以"val"开头的E元素，主要用于lang属性，比如"en"、"en-us"、"en-gb"等等
    color:green;
  }
}


.main-content{
  // background-color:aqua;
  width:100%;
  height:auto;
}
// div{
//   width:666px;
//   height:100px;
//   text-align: center;
// }
section{
  margin:30px 0p;
}
h1{
  width:500px;
  background-color: #eee;
  text-indent: 2rem;
}
#example1{
  background-color: aqua;
}
.example2{
  background-color:bisque
}
.multi{
  #one,#two{
    /* 多元素选择器 */
    color:blue;
  }
  .grandpa{
    color:white;
    background-color: black
  }
  .parent{
    width:80%;
    background-color: brown
  }
  .children{
    width:80%;
    background-color:cadetblue
  }
  .grandpa div{ 
    /* 空格分隔 后代选择器 */
    width:100px;
    float:left;
  }
  .grandpa > div{
    /* 子选择器 */
    width:200px;
  }
  .parent + div{
    /* 毗邻选择器 */
    background-color: rebeccapurple;
  }
}

</style>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import JSONP from './components/Jsonp.vue'
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
    'c-footer':Footer,
    'c-JSONP':  JSONP
  }
}
</script>

