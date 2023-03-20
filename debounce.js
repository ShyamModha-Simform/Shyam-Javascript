console.log("Debouncing");

let count = 0;
function getResults(){
    console.log(this);
    count++;
    console.log("API call has been made for ",count,"th time..")
}


function debouce(fn, delay){
    // Here we need to set arguments and context for returned function
    let timer;


    return function (){
        let context = this,
            args = arguments;

        clearTimeout(timer); // to reset timer , as we keystroke happens

        timer = setTimeout(()=>{ // wait for time between two keyup event to surpass delay .. 
            fn(context, args);
        }, delay); 
    }
}


const optimizedApiCalls = debouce(getResults, 300);