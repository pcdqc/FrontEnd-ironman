export  function double(i){
  return i+i;
};
export function trible(i){
  return i*3;
}
export function changeHTML(){
  return new Promise((resolve, reject) => {
    let incre = document.querySelector('#increment');
    incre.innerHTML = 'changed Incrementer!';
    resolve(incre);
  })
}