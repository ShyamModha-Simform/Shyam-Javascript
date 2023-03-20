
var a = 10;
console.log(`hello ${a}`);

let x = 20;

// This curly braces is known as block 
// --used to combine multiple line of js
{
    // Compound statements
    var a1 = 10;

    // let and const is block Scoped.
    let b1 = 20;
    const c1 = 30;
}

if(true) {
    // Illegal Hoisting
    // var x = 10; cannot do that here
    console.log(x);
}

f();

function f(){
    var x = 10;
    console.log(x);
}


// Closures

function closure(){
    let x1 = 20;
    function y1 (){
        console.log(x1);
    }
    return y1;
}

let z = closure(); // here z contains function y with its closure

z();

// Most Tricky question asked in interview which has solution related to closures

function closureWithTimeout(){
    for(let i = 1; i <=5 ; i++){

        // function tempClose(t2){

            setTimeout(function (){
                console.log(i);
            },i*1000);
        // }

        // tempClose(i);
    }
    console.log("Namaste JAVAScript");
}

closureWithTimeout();

let temp = 99;

function outer(temp2){
    temp = 101;

    function inner(){
        console.log(temp, temp2);
    }
    return inner;
}



outer("Hello World")();
console.log(temp);

var namedFunExp = function xyz(){
    console.log(xyz);
}

namedFunExp();

var a = 100;

// Event listeners

function attachEvent(){
    count = 0;
    
    document.getElementById("clickme").addEventListener("click", function(){
        console.log("Clicked", ++count);
    });

}

attachEvent();

for (var i = 0; i < 3; i++){
    console.log("In for loop", i);

}
