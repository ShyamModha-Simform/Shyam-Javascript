// const View = require([ "./MVC/View"]);
// const Model = require([ "./MVC/Model"]);

class Model {
  constructor() {
    this.productData = [];
    // console.log(Array.isArray((localStorage.getItem('productData'))));
    if (Array.isArray(JSON.parse(localStorage.getItem("productData")))) {
      this.productData = JSON.parse(localStorage.getItem("productData"));
    }
  }

  setProductData(product) {
    this.productData.push(product);
    localStorage.setItem("productData", JSON.stringify(this.productData));
  }

  getProductData() {
    return this.productData;
  }

  deleteProductData(id) {
      this.productData = this.productData.filter(product => product.productID !== id);
      console.log(this.productData, id)
    localStorage.setItem("productData", JSON.stringify(this.productData));
  }
}

class View {
  constructor() {
    this.controller = null;
    this.cardsWrapper;
    this.submitForm = document.querySelector(".product-submit");
  }

  initController(controller) {
    this.controller = controller;
  }

  //   ----------------____Reading data from form and Adding to global array___-----------------

  readDataFromInputs() {
    return {
      productName: document.querySelector(".product-name-input").value,
      productID: document.querySelector(".product-id-input").value,
      productPrice: document.querySelector(".product-price-input").value,
      productDetails: document.querySelector(".product-details-input").value,
      productImage: document.querySelector(".product-image-input").value,
    };
  }
//   ----------_ Event Handlers--------
  onSubmitEvent() {
    console.log(this.submitForm);
    this.submitForm.addEventListener("click", (e) => {
      // context
      console.log("Onclick performed", this.readDataFromInputs());
      this.controller.setDataIntoModel(this.readDataFromInputs());
      this.renderCardsView(model);
    });
  }

  onDeleteClick(){
    this.deleteButtons = document.querySelectorAll(".delete-button");
    this.deleteButtons.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (e)=>{
            // Be aware when changing `markUpHelper`
            const id = (Array.from(deleteBtn.parentElement.children)[2]).innerText; 
            this.controller.deleteProduct(id);
        })
    });
  }  

  init(model) {
    console.log(model);
    this.cardsWrapper = document.querySelector(".cards-wrapper");
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });

    this.onSubmitEvent(model);
    this.onDeleteClick();
  }

  renderCardsView(model) {
    this.cardsWrapper.innerHTML = "";
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });
  }

  markUpHelper(element) {
    return `<div class="col">
        <div class="card h-100">
          <img src="pexels-fauxels-3184450.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${element.productName}</h5>
            <h5 class="card-price">${element.productPrice}</h5>
            <h5 class="card-id">
            ${element.productID}
            </h5>
            <p class="card-text">
              ${element.productDetails}
            </p>
            <button type="button" class="btn btn-primary w-50 mb-3">Edit</button>
            <button type="button"  class="btn btn-danger w-50 mb-3 delete-button">Delete</button>
          </div>
        </div>
      </div>`;
  }
}

class Controller {
  constructor(view) {
    this.view = view;
    this.model = null;
  }

  setModel(model) {
    this.model = model;
  }
  getView() {
    return this.view;
  }
  setDataIntoModel(data) {
    this.model.setProductData(data);
  }

  deleteProduct(id){
    this.model.deleteProductData(id);
    console.log("In controller delete Function")
    this.view.renderCardsView(model);
  }
}

let model = new Model();
console.log(model.productData);
let view = new View();
let controller = new Controller(view);
controller.setModel(model);
view.initController(controller);
controller.getView().init(model);
