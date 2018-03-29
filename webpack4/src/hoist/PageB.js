import { utilA } from './utilA';
import { utilB, funcB } from './utilB';uncB();
import('./utilC').then(function(utilC) {
  console.log(utilC);
})