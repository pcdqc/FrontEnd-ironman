import { describe, before,it} from 'mocha';
import { expect } from 'chai';
import double from '../lib2'
describe('Hello World', function() {
  it('should double a value', function () {
    var result = double(5);
    console.log(result)
    expect(result).eq(10);
  })
})