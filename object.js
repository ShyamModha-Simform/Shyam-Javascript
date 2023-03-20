
// Creating object literal

const obj1 = {
    name: 'Joey',
    age: 51,
}

const tempObj1 = obj1;

const para1 = "city";

obj1.last_name = 'Kayki';
obj1["email"] = "shyam@mail.com";
obj1[para1] = "Ahmedabad";


// we can iterate object by two ways
// 1. for in loop
// 2. object keys


for(let key in obj1){
    console.log(obj1[key]);
}


// computed properties

const k1 = "name";
const value1 = "Das Auto";

const obj2 = {
    [k1] : value1,
}

// Spread operator to clone objects

// Obejct destructuring 
//     key : alias name for our convenience
const {name: first_name, age,...temp1} = obj1;

console.log(obj1);
console.log(tempObj1)

console.log(first_name, age, temp1);

function fun1(){
    console.log("fun1")
}

function fun2(){
    console.log("fun2")
}

let regex = new RegExp(/[0-9+-=\/()]/gm);

let result1 = regex.dotAll();

console.log(result1);
