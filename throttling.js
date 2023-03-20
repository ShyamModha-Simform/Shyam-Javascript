function Expensive(){
    console.log("Really Expensive in terms of Load Time..");
}

// If i directly pass function then it will create use less to many API calls to backend
// ...So we need some type of logic to optimize how many times it should be executed

function throttling(fn, delay){
    let flag = true;
    return function(){
        let context = this,
        args = arguments;

        if(flag){
            fn.apply(context, args);
            flag = false;

            setTimeout(()=>{
                flag = true;
            }, delay);
        }
    }
}

const optimizedExpensive = throttling(Expensive, 0);
window.addEventListener("resize", optimizedExpensive);