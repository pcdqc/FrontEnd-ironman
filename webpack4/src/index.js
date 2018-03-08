import _ from 'lodash'
import './style.css'
import './main.css'
import House from './images/house.jpg'
import Data from './data/data.xml'
console.log(House)
function component() {
  var ele = document.createElement('div');

  ele.innerHTML = _.join(['Hello', 'webpack'], ' ');
  ele.classList.add('hello')
  console.log(Data);
  return ele;
}
document.body.appendChild(component())