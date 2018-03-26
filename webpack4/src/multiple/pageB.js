import utilB from './js/utilB.js'
console.log(utilB)
const utilC = () => require.ensure(['./js/utilC'], function(require){
  console.log(require('./js/utilC'))
});
utilC();