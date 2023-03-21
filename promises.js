const cart = ["a", "b"];

// we can handle async function by two ways
// Callbacks and Promises

// But callbacks create inversion of control over first class function

const promise = createOrder(cart); // this async code will give orderID

promise
  .then((orderID) => {
    console.log("Fetched using promise", orderID);
    // return proceedToPayment(orderID);       // If we are going to use promise chaining then return is must
  })
  .catch((err) => {
    console.log(err.message);
  });

// Creating custom async function which will eventually return promise

function createOrder(cart){
    const pr = new Promise((resolve, reject) => {

        // validation 
        if(!isValidCart(cart)){
            const err = new Error("Cart is not valid");
            reject(err);
        }

        // Logic for creating order and getting OrderID
        const orderID = "Ajs1kASo2839";

        // Resolve pending promise once we got orderID

        if(orderID){
           
            // create fake waiting scenario
            setTimeout(()=>{
                resolve(orderID);
            }, 5000);
        }
    });


    return pr;
}


function isValidCart(cart){
    return true;
}