/**
 * @link https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/fisher-yates
 */

import fisherYates from './fisherYates.js';

(function () {
  const randomArray = fisherYates([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  console.log(randomArray);
})()
