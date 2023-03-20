// array is basically object type----------
// Referance type 

let arr1 = ["shyam", 10, true];

console.log(typeof arr1);

// check that given object is array or not-------------
console.log(Array.isArray(arr1) ? "yes, it is array" : "No it is not");  // turnary operation

console.log(arr1);

let arr2 = arr1;
console.log(arr2, "arr2");

arr1[3] = 20;
console.log(arr2, "arr2");

// clone array without pointing to same address , it has three ways-------------


let arr3 = arr1.slice(0);
// 2. using spread operator
// 3. let arr3 = [].concat(arr1);

// One can use push() to add element at last and pop() to remove element at last

// another way is unshift() and shift()

arr1.unshift("modha");
arr1.shift();

// push and pop is fast as compare to unshift and shift----------


const arr5 = arr1.slice(0);

// now we can modify arr5 using push and pop operator only , we can't change it's value as we change let and var----------

// High level method for array
//  fill( filler element, start, end);

arr3.fill(2, 2, 4); // from 2nd position until 4th index

console.log(arr3, "After fill()");
console.log(arr1);

// filter() -> it filters out matched element and return as array
console.log(arr1.filter(ele => (typeof ele) === typeof true));


// find() -> this also works as same but it will return the first element which satisfies the condition
console.log(arr1.find(ele => ele > 9));

// flat() -> To remove nested array

// const arr1 = [0, 1, 2, [3, 4]];
// console.log(arr1.flat());
// const arr2 = [0, 1, 2, [[[3, 4]]]];
// console.log(arr2.flat(2));

// map() used for iteration with call back function on each element and returns and stores as array

// reduce() -> I used it during cart updation 

const arr6 = [1, 3, 5, 7];

console.log(arr6);

const ans = arr6.reduce((sumTillNow, currValueOfArray)=> {
    return (sumTillNow + currValueOfArray);
}, 0)

console.log(ans);

// splice() -> arr.splice(start, deleteCount, item1,item2.....,itemN)..

arr6.splice(2,2,20);
console.log(arr6);


(function (){
    var tempFun = 20;
    console.log("kdjfklsjd");
})();

console.log(arr1 === arr2)