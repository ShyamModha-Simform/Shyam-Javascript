// const View = require([ "./MVC/View"]);
// const Model = require([ "./MVC/Model"]);

class Model {
  constructor() {
    this.productData = JSON.parse(localStorage.getItem("productData")) || [];
    // console.log(Array.isArray((localStorage.getItem('productData'))));
  }

  setProductData(product) {
    this.productData.push(product);
    localStorage.setItem("productData", JSON.stringify(this.productData));
  }

  getProductData() {
    return this.productData;
  }

  deleteProductData() {
    console.log(this.productData, "=== delete in Model===");
    localStorage.setItem("productData", JSON.stringify(this.productData));
  }

  updateProductData() {
    console.log(this.productData, "=== updated product data===");
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

  readDataFromInputs(classPrefix) {
    // const classPrefix = `.add-product-form > div > `;
    return {
      productName: document.querySelector(`${classPrefix}.product-name-input`).value,
      productID: document.querySelector(`${classPrefix}.product-id-input`).value.trim(),
      productPrice: document.querySelector(`${classPrefix}.product-price-input`).value,
      productDetails: document.querySelector(`${classPrefix}.product-details-input`).value,
      productImage: document.querySelector(`${classPrefix}.product-image-input`).value,
    };
  }

  fillExistingDataIntoEditForm(product) {
    const classPrefix = `.update-form > div > `;
    document.querySelector(`${classPrefix}.product-name-input`).value = product.productName;
    document.querySelector(`${classPrefix}.product-id-input`).value = product.productID;
    document.querySelector(`${classPrefix}.product-price-input`).value = product.productPrice;
    document.querySelector(`${classPrefix}.product-details-input`).value = product.productDetails;
    document.querySelector(`${classPrefix}.product-image-input`).value = product.productImage;
  }
  //   ----------_ Event Handlers--------
  onSubmitEvent() {
    console.log(this.submitForm);
    this.submitForm.addEventListener("click", (e) => {
      // context
      // console.log("Onclick performed", this.readDataFromInputs(`.add-product-form > div > `));
      this.controller.setDataIntoModel(this.readDataFromInputs(`.add-product-form > div > `));
      this.renderCardsView(model);
    });
  }

  onEditButtonClick() {
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editButtons.forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        // Be aware when changing `markUpHelper`
        this.selectedProductID = editBtn.getAttribute("data-custom-id")
        console.log("=== Edit button ===", this.selectedProductID)
        let productBuffer = this.controller.findProduct( this.selectedProductID);
        console.log("=== product buffer object ===", productBuffer)
        this.fillExistingDataIntoEditForm(productBuffer);

        this.onUpdateButtonClick();
        // this.controller.deleteProduct(id);
        // this.controller.updateProduct({}, );
      });
    });
  }

  onUpdateButtonClick(){
    const submitUpdates = document.querySelector(".submit-updated-product");
    console.log(submitUpdates);
    submitUpdates.addEventListener("click", ()=>{
      this.controller.updateProduct(this.readDataFromInputs(`.update-form > div >`),this.selectedProductID)
      this.renderCardsView(this.controller.model);
    })
  }

  onDeleteClick(_id) {
    this.deleteButtons = document.querySelectorAll(".delete-button");
    this.deleteButtons.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        // Be aware when changing `markUpHelper`
        const id = deleteBtn.getAttribute("data-custom-id")
        this.controller.deleteProduct(id);
      });
    });
  }

  init(model) {
    console.log(model);
    this.cardsWrapper = document.querySelector(".cards-wrapper");
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });

    // registering event listeners at first initialization
    this.onSubmitEvent(model);
    this.onDeleteClick();
    this.onEditButtonClick();
  }

  renderCardsView(model) {
    this.cardsWrapper.innerHTML = "";
    console.log("===")
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });
    this.onDeleteClick();
    this.onEditButtonClick();
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
            <button type="button" class="btn btn-primary w-50 mb-3 edit-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-custom-id="${element.productID}">Edit</button>
            <button type="button" class="btn btn-danger w-50 mb-3 delete-button" data-custom-id="${element.productID}">Delete</button>
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

  deleteProduct(id) {
    this.model.productData = this.model.productData.filter(
      (product) => product.productID !== id
    );
    this.model.deleteProductData();
    console.log("In controller delete Function");
    this.view.renderCardsView(model);
  }


  updateProduct(product, id) {
    let indexOfExistingProduct = this.model.productData.find(product => product.productID === id);
    console.log(indexOfExistingProduct);
    // Now we want to replace an existing object with updated object
    this.model.productData.splice(indexOfExistingProduct, 1, product);
    this.model.updateProductData();
  }

  findProduct(id) {
    let indexOfExistingProduct = this.model.productData.findIndex(product => product.productID === id);
    console.log(this.model.productData)
    return this.model.productData[indexOfExistingProduct];
  }
}

let model = new Model();
console.log(model.productData);
let view = new View();
let controller = new Controller(view);
controller.setModel(model);
view.initController(controller);
controller.getView().init(model);
