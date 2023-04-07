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
    // this.imgBase64URL = null;
  }

  initController(controller) {
    this.controller = controller;
  }

  //   ----------------____Reading data from form and Adding to global array___-----------------

  readDataFromInputs(classPrefix) {
    // console.log(this.controller.convertImageToBase64URL(classPrefix));
    // const classPrefix = `.add-product-form > div > `;
    return {
      productName: document.querySelector(`${classPrefix}.product-name-input`).value,
      productID: document.querySelector(`${classPrefix}.product-id-input`).value.trim(),
      productPrice: document.querySelector(`${classPrefix}.product-price-input`).value,
      productDetails: document.querySelector(`${classPrefix}.product-details-input`).value,
      productFilePath: document.querySelector(`${classPrefix}.product-image-input`).files[0] ,
      productImage: document.querySelector(`${classPrefix}.img-add-preview`).getAttribute('src'),
    };
  }

  fillExistingDataIntoEditForm(product) {
    const classPrefix = `.update-form `;
    console.log(product.productImage)
    document.querySelector(`${classPrefix}.product-name-input`).value = product.productName;
    document.querySelector(`${classPrefix}.product-id-input`).value = product.productID;
    document.querySelector(`${classPrefix}.product-price-input`).value = product.productPrice;
    document.querySelector(`${classPrefix}.product-details-input`).value = product.productDetails;
    // document.querySelector(`${classPrefix}.product-image-input`).value = product.productImage;
    document.querySelector(`${classPrefix}.img-add-preview`).setAttribute('src' , product.productImage);
  }

  //   ----------_ Event Handlers--------
  onSubmitEvent() {
    console.log(this.submitForm);
    this.submitForm.addEventListener("click", (e) => {
      // context
      // console.log("Onclick performed", this.readDataFromInputs(`.add-product-form > div > `));
      this.controller.setDataIntoModel(this.readDataFromInputs(`.add-product-form `));
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

        
        // this.controller.deleteProduct(id);
      });
    });
  }

  onUpdateButtonClick(){
    const submitUpdates = document.querySelector(".submit-updated-product");
    console.log(submitUpdates);
    submitUpdates.addEventListener("click", ()=>{
      this.controller.updateProduct(this.readDataFromInputs(`.update-form `),this.selectedProductID)
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

  onImageInput(classPrefix){
    document.querySelector(`${classPrefix}.product-image-input`).addEventListener("change", ()=>{
      let files = document.querySelector(`${classPrefix}.product-image-input`).files[0];
      this.controller.convertImageToBase64URL(classPrefix,this.storeBase64URL, files);
      // Below line will print undefined because FileReader promise is still pending
      console.log(this.imgBase64URL);
    })
  }

  storeBase64URL(url, context){
    // this.imgBase64URL = url;
    context.imgBase64URL = url
    console.log(url);
    // return url;
  }

  onSearchBarInput(){
    document.querySelector(".filter-query").addEventListener("input", (e)=>{
      console.log("=== Searching .. ===")
      this.controller.filterProductList(e.target.value);
      this.renderCardsView(this.controller.model);

    })
  }

  init(model) {
    console.log(model);
    this.cardsWrapper = document.querySelector(".cards-wrapper");
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });

    // registering event listeners at first initialization
    this.onSubmitEvent(model);
    this.onImageInput(`.add-product-form > div > `)
    this.onImageInput(`.update-form > div > `)
    this.onDeleteClick();
    this.onEditButtonClick();
    this.onUpdateButtonClick();
    this.onSearchBarInput();
  }

  renderCardsView(model) { // products to be added==========
    this.cardsWrapper.innerHTML = "";
    // console.log("===")
    // products=====================================
    model.getProductData().forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });
    // Go through defination of below listed function once to avoid unneccesary rendering
    this.onDeleteClick();
    this.onEditButtonClick();
  }

  markUpHelper(element) {
    return `<div class="col">
        <div class="card h-100">
          <img src="${element.productImage}" class="card-img-top" alt="..." />
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
    let indexOfExistingProduct = this.model.productData.findIndex(product => product.productID === id);
    console.log(indexOfExistingProduct);
    if(indexOfExistingProduct < 0){
      return;
    }
    // Now we want to replace an existing object with updated object
    this.model.productData.splice(indexOfExistingProduct, 1, product);
    this.model.updateProductData();
    return this.model.productData;
  }

  findProduct(id) {
    let indexOfExistingProduct = this.model.productData.findIndex(product => product.productID === id);
    console.log(this.model.productData)
    return this.model.productData[indexOfExistingProduct];
  }

  convertImageToBase64URL(classPrefix, callbackFn, files){
    let context = this;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
      document.querySelector(`${classPrefix}.img-preview > .img-add-preview`).setAttribute('src', this.result);
        // To store value in outer scope of Event listener callback function
        callbackFn(this.result, context.view);
      });     
    }
  }

  filterProductList(queryString){
    this.model.productData = this.model.productData.filter((product)=>{
      console.log(product)
      return product.productID.includes(queryString);
    })
  }
}

let model = new Model();
console.log(model.productData);
let view = new View();
let controller = new Controller(view);
controller.setModel(model);
view.initController(controller);
controller.getView().init(model);
