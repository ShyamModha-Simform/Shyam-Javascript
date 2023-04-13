// ------------------------------------- MODEL -----------------------------------
class Model {
  constructor() {
    // Routing Paths
    this.routes = {
      "/404": {
        file: "/404.html",
        title: "Error | CRUD",
      },
      "/": {
        file: "/AddProduct.html",
        title: "Add | CRUD",
      },
      "/index.html": {
        file: "/AddProduct.html",
        title: "Add | CRUD",
      },
      "/#products": {
        file: "/DisplayProduct.html",
        title: "Products | CRUD",
      },
    };
    // Fetching products from Localstorage on load of webpage
    this.productData = JSON.parse(localStorage.getItem("productData")) || [];
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
// ------------------------------------------ VIEW ----------------------------------------------
class View {
  constructor() {
    this.controller = null;
  }

  initController(controller) {
    this.controller = controller;
  }
  // Initializing and Adding necessary Event handlers to give start to CRUD app
  init() {
    // 
    this.controller.handleLocation();
    this.displayAddProductPage();
    this.onAddButtonClick();
    this.onImageInput(`.update-form > div > `);
    this.onUpdateButtonClick();
    this.onSearchBarInput();
    this.callBackForSorting();
    this.onSortTypeButtonClick(); // ASC/DESC button click
    document.querySelector(".addButton").addEventListener("click", () => {
      this.controller.route();
    });
    document.querySelector(".viewButton").addEventListener("click", () => {
      this.controller.route();
    });
  }

  // render cards from products lists
  renderCardsView(products) {
    this.cardsWrapper.innerHTML = "";
    if (products.length === 0) {
      this.cardsWrapper.innerHTML += `<div class="m-auto empty-cart-msg">
      <h2 class="mb-3">There is nothing to show :-( </h2>
      <h2>Please add some...</h2>
      </div>`;
      return;
    }
    products.forEach((element) => {
      this.cardsWrapper.innerHTML += this.markUpHelper(element);
    });

    // FOR READ MORE:- Testing phase-------
    const cardContents = document.querySelectorAll(".card-content");
    const readMoreButtons = document.querySelectorAll(".read-more-btn")
    this.toggleReadMore(cardContents,readMoreButtons)
    // ---------
    
    // Event listeners for Cards buttons
    this.displayOverFlownText(cardContents,readMoreButtons);
    this.onDeleteClick();
    this.onEditButtonClick();
  }

  // Helper function to add Dynamic HTML
  markUpHelper(element) {

    return `<div class="card">
    <div class="card-image-wrapper">
      <img src="${element.productImage}" class="card-img-top" alt="..." />
    </div>
    <div class="card-body">
      <h4 class="card-title">${element.productName}</h4>
      <h5 class="card-id">ID:${element.productID}</h5>
      <h6 class="card-price">Price: ${element.productPrice}</h6>
		  <p class="card-content wrap-content">${element.productDetails}</p><p class="read-more-btn hide-read-more">Read More</p>
      <button type="button" class="btn mb-3 edit-button btn-style-pink" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-custom-id="${element.productID}">Edit</button>
      <button type="button" class="btn mb-3 delete-button btn-style-pink" data-custom-id="${element.productID}">Delete</button>
      </div>
	</div>`;
  }

  readDataFromInputs(classPrefix) {
    // const classPrefix = `.add-product-form > div > `;
    return {
      productName: document.querySelector(`${classPrefix}.product-name-input`)
        .value,
      productID: document
        .querySelector(`${classPrefix}.product-id-input`)
        .value.trim(),
      productPrice: document.querySelector(`${classPrefix}.product-price-input`)
        .value,
      productDetails: document.querySelector(
        `${classPrefix}.product-details-input`
      ).value,
      productFilePath: document.querySelector(
        `${classPrefix}.product-image-input`
      ).files[0],
      productImage: document
        .querySelector(`${classPrefix}.img-add-preview`)
        .getAttribute("src"),
    };
  }

  fillExistingDataIntoEditForm(classPrefix, product) {
    // console.log(product.productImage);
    document.querySelector(`${classPrefix}.product-name-input`).value =
      product.productName;
    document.querySelector(`${classPrefix}.product-id-input`).value =
      product.productID;
    document.querySelector(`${classPrefix}.product-price-input`).value =
      product.productPrice;
    document.querySelector(`${classPrefix}.product-details-input`).value =
      product.productDetails;
    // document.querySelector(`${classPrefix}.product-image-input`).value = product.productImage;
    document
      .querySelector(`${classPrefix}.img-add-preview`)
      .setAttribute("src", product.productImage);
  }

  // Helper for toggling Read More button
  toggleReadMore(listOfContent, listOfReadMores){
    for(let i = 0; i < listOfContent.length; i++){
      const cardContent = listOfContent[i];
      const readMoreButton = listOfReadMores[i];
      const isOverFlown = cardContent.scrollHeight > cardContent.clientHeight || cardContent.scrollWidth > cardContent.clientWidth
      console.log(isOverFlown);
      if(isOverFlown){
        cardContent.classList.add("content-overflown");
        readMoreButton.classList.remove("hide-read-more");
      }
    }
  }

  // Validator for productID
  validateID() {
    const element = document.querySelector(
      `.add-product-form > div > .product-id-input`
    );
    console.log("=== Inside ID Validation ===");
    if (this.controller.isIDExist(element.value)) {
      element.classList.add("id-error");
      confirm("Please enter unique ID..");
      return;
    } else {
      element.classList.remove("id-error");
    }
  }

  //----------------- EVENT LISTENERS -------------

  onSubmitForm(addNewProduct) {
    addNewProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validateID();
      const productBuffer = this.controller.setDataIntoModel(
        this.readDataFromInputs(`.add-product-form `)
      );
      this.fillExistingDataIntoEditForm(`.add-product-form `, {
        productName: "",
        productID: "",
        productPrice: "",
        productDetails: "",
        productImage:
          "data:image/webp;base64,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bPgnEvY7bliCVg6/ULDjbuxWg14uf6/TloHyXrFRTMR/jS123fNOeWjm669d2HfT9ylDN+e/lbD1eZc6KSf0v1Sw+Z73yEI72z/Uafdg2g5F6OfwZ9jiAKb9qdDQ9a94HMGLN4dJRRn+GxmH0LS9uaCj/Z9oOId5ZxK0dP4DbA4CPG9LhZqm8e88jqLtm8JGT8H9s4TDSGVPLmjq9I8azmPckQRd3f8JmwMBN7ajQllb/hcXjiTVzWCjrRD/QcKpTHvhoK/rf9ZwLj1vRITCNvxfmYMBO7ahQGX7/wpHk+omDNJZKAcGSFvAFkqbxomB5w0IUNvXkYEdy5ehuPORAdXFa1Dd/cgAeenY6C53aBBWzkF5p0MDx8sWoL77oYHpi5ahv+2pAZUla9Dg8dQAacEGqTC0YwPPq8UWOtzwsYHjxfLQ4uHcwPSlStDj9dyAykIVKHLD5wZIy9Sgyv3JQVikQboM5eTA8QqxhTInPjkwfYEuqHN/dEB1eSIUejk6QF6cBI1OfHaQliZDp/vDA78wFVo9Hx44XpVOao348MD0NRkGev06PaC2Imyh2fPpAcp6sINqp3F8kFaDHZT7dX4QFuOCes/nBxevhId+p3F+YMc6BGj46wDB9FUI0PE5gUB1DSKUPGUQkFcg4lsxPV/E12J4uojvRcePFvDFaMeDBXwzmv5YAV+NVB/K48MxPxE7fDrG52GLj8fwNN3g89HxozTCB6QdD1IIn5CmPUbCVySVh/D4kMxPwA6fkmF+zeBj8uLJZXxP2jEzDviiNH1e3eKbksqsMr4r05TY48vS83yKwbelHZNhj89L06ZSCF+YeR7s8ZHpeQ6cCJ+Zts+gGHxq5p9rDl+bbvxU8/jgpPQ79cJHpym/USw+PE0cf20kg69PV/jvcL7wCUqh8F/gEggfoi61f1OTw/coXTE3/n/jmqPDl6lxPoSUck4xBu8I/9///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M//ExMA",
      });
      window.location.href += "#products";
      this.controller.handleLocation();
    });
  }

  // Read more/ Read less event listeners
  displayOverFlownText(listOfContent,listOfReadMores){
    for(let i = 0; i < listOfContent.length; i++){
      const cardContent = listOfContent[i];
      const readMoreButton = listOfReadMores[i];
      
      readMoreButton.addEventListener('click', ()=>{
        cardContent.classList.toggle('wrap-content');
        cardContent.classList.toggle('content-overflown');
        const toCompare = readMoreButton.innerHTML;
        readMoreButton.innerHTML = toCompare === "Read More" ? "Read Less" : "Read More";
      })
    }
  }

  // Card's Edit buttons
  onEditButtonClick() {
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editButtons.forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        // Be aware when changing `markUpHelper`
        this.selectedProductID = editBtn.getAttribute("data-custom-id");
        console.log("=== Edit button ===", this.selectedProductID);
        let productBuffer = this.controller.findProduct(this.selectedProductID);
        console.log("=== product buffer object ===", productBuffer);
        this.fillExistingDataIntoEditForm(`.update-form `, productBuffer);

        // this.controller.deleteProduct(id);
      });
    });
  }
  // Form model's Update buttons
  onUpdateButtonClick() {
    const submitUpdates = document.querySelector(".submit-updated-product");
    submitUpdates.addEventListener("click", () => {
      const productsBuffer = this.controller.updateProduct(
        this.readDataFromInputs(`.update-form `),
        this.selectedProductID
      );
      this.renderCardsView(productsBuffer); // Added to fix renderView ---remove once it started working
    });
  }
  // Card's Delete buttons
  onDeleteClick(_id) {
    this.deleteButtons = document.querySelectorAll(".delete-button");
    this.deleteButtons.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        if (confirm("Are you sure to delete?")) {
          // Be aware when changing `markUpHelper`
          const id = deleteBtn.getAttribute("data-custom-id");
          this.controller.deleteProduct(id);
        }
      });
    });
  }
  // Image preview functionality
  onImageInput(classPrefix) {
    document
      .querySelector(`${classPrefix}.product-image-input`)
      .addEventListener("change", () => {
        console.log("TEMP:- Image input fired");
        let files = document.querySelector(`${classPrefix}.product-image-input`)
          .files[0];
        this.controller.convertImageToBase64URL(
          classPrefix,
          this.storeBase64URL,
          files
        );
        // Below line will print undefined because FileReader promise is still pending
        console.log(this.imgBase64URL);
      });
  }
  // Coverting Read image file into BASE64 URL
  storeBase64URL(url, context) {
    // this.imgBase64URL = url;
    context.imgBase64URL = url;
    // return url;
  }
  // For FILTER functionality
  onSearchBarInput() {
    // OPTIMIZATION:-- BY debouncing we can reduce number of time function called
    document.querySelector(".filter-query").addEventListener("input", (e) => {
      console.log("=== Searching .. ===");
      const selectTag = document.querySelector(".select-filter-params");
      const filterAttribute = selectTag.options[
        selectTag.selectedIndex
      ].getAttribute("data-custom-attribute");
      console.log("===  ===", filterAttribute);
      const fliteredProductsBuffer = this.controller.filterProductList(
        e.target.value,
        filterAttribute
      );
      this.renderCardsView(fliteredProductsBuffer);
    });
  }
  // Sorting for ASC/DESC button
  onSortTypeButtonClick() {
    let sortTypeButton = document.querySelector(".sort-type-button");

    sortTypeButton.addEventListener("click", (e) => {
      sortTypeButton.innerHTML =
        sortTypeButton.innerHTML === "ASC" ? "DESC" : "ASC";
      let sortType = sortTypeButton.innerHTML;
      console.log(sortTypeButton.innerHTML);
      const selectTag = document.querySelector(".select-sort-params");
      const keyAttribute = selectTag.options[
        selectTag.selectedIndex
      ].getAttribute("data-custom-attribute");
      this.renderCardsView(
        this.controller.sortProductList(keyAttribute, sortType)
      );
    });
  }

  onInputIDValidation(classPrefix) {
    let element = document.querySelector(`${classPrefix} .product-id-input`)
    console.log("=== Inside ID Validation ===");
    element.addEventListener("input", (e) => {
      console.log(this.controller.isIDExist(e.target.value));
      if (this.controller.isIDExist(e.target.value)) {
        console.log("mached");
        element.classList.add("id-error");
      } else {
        element.classList.remove("id-error");
      }
    });
  }

  onAddButtonClick() {
    const addButton = document.querySelector(".addButton");
    addButton.addEventListener("click", () => {
      this.displayAddProductPage();
    });
  }

  // Helper function for sorting
  callBackForSorting() {
    document
      .querySelector(".select-sort-params")
      .addEventListener(`change`, (e) => {
        let sortType = document.querySelector(".sort-type-button").textContent;
        let keyAttribute = e.target.options[
          e.target.selectedIndex
        ].getAttribute("data-custom-attribute");
        this.renderCardsView(
          this.controller.sortProductList(keyAttribute, sortType) 
        ); //returns and copy of sorted array
      });
  }
  displayAddProductPage() {   // To add neceessary things whenever ADD FORM is loaded
    this.controller.waitForElm(".add-new-product").then((addNewProduct) => {
      console.log("=== Form is ready ===");
      this.onInputIDValidation(`.add-product-form > div > `);
      this.onImageInput(`.add-product-form > div > `);
      this.onSubmitForm(addNewProduct);
    });
  }
}
// ----------------------------------------- CONTROLLER -----------------------------------------
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  isIDExist(inputValue) {
    for (const element of this.model.productData) {
      if (Number(element.productID) === Number(inputValue)) {
        return true;
      }
    }
    return false;
  }

  getView() {
    return this.view;
  }
  setDataIntoModel(data) {
    this.model.setProductData(data);
    return this.model.productData;
  }

  deleteProduct(id) {
    this.model.productData = this.model.productData.filter(
      (product) => product.productID !== id
    );
    this.model.deleteProductData();
    console.log("In controller delete Function");
    this.view.renderCardsView(this.model.productData);
  }

  updateProduct(product, id) {
    let indexOfExistingProduct = this.model.productData.findIndex(
      (product) => product.productID === id
    );
    console.log(indexOfExistingProduct);
    if (indexOfExistingProduct < 0) {
      return;
    }
    // Replace existing object with new object
    this.model.productData.splice(indexOfExistingProduct, 1, product);
    this.model.updateProductData(); // updating product list through Model
    return this.model.productData;
  }

  findProduct(id) {
    let indexOfExistingProduct = this.model.productData.findIndex(
      (product) => product.productID === id
    );
    console.log(this.model.productData);
    return this.model.productData[indexOfExistingProduct];
  }

  convertImageToBase64URL(classPrefix, callbackFn, files) {
    let context = this;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        console.log(this.result, "=== Inside callback")
        const tempBuffer = this.result;
        document
          .querySelector(`${classPrefix}.img-preview > .img-add-preview`)
          .setAttribute("src", tempBuffer); // Sometime direclty this.result won't update SRC
        // To store value in outer scope of Event listener callback function
        console.log(context.view)
        callbackFn(tempBuffer, context.view);
      });
    }
  }

  filterProductList(queryString, filterAttribute) {
    return this.model.productData.filter((product) => {
      console.log(product);
      return product[`${filterAttribute}`].includes(queryString);
    });
  }

  sortProductList(attributeName, sortType) {
    // For Alphabets
    this.model.productData.sort((a, b) => {
      if(attributeName === "productName"){
        if (a[attributeName] < b[attributeName]) {
          return sortType === "ASC" ? -1 : 1;
        } else if (a[attributeName] > b[attributeName]) {
          return sortType === "ASC" ? 1 : -1;
        } else {
          return 0;
        }
      }
        // For Numbers
      else{
          return sortType === "ASC" ? (a[attributeName] - b[attributeName]) : (b[attributeName] - a[attributeName]);
        } 
      });
    
    return this.model.productData;
  }

  // ROUTING---------
  route(event) {
    event = event || window.event;
    console.log(event);
    event.preventDefault();
    console.log(window.history);
    window.history.pushState({}, "", event.target.href);
    this.handleLocation();
  }

    // Fetching HTML from seperate file and displaying it
  async addInnerHtml(routePath, id, title) {
      const html = await fetch(routePath).then((data) => data.text());
      document.getElementById(id).innerHTML = html;
      document.title = title;
      console.log("=== Add Product Form Loaded ===");
    }

  async handleLocation() {
    let path = window.location.pathname + window.location.hash;
    const route =
      this.model.routes[path].file || this.model.routes["/404"].file;
    const title =
      this.model.routes[path].title || this.model.routes["/404"].title;
    // For add product FORM
    if (route === "/AddProduct.html") {
      // TOGGLE buttons for view and add
      document.querySelectorAll(`.navbar-nav .toggleButtons`).forEach((btn) => {
        console.log(btn);
        btn.classList.add("hide-button");
      });
      document
        .querySelector(`.nav-item > .viewButton`)
        .classList.remove("hide-button");
      // Fetching html dynamically
      this.addInnerHtml(route, "dynamic-content", title);
      console.log("Complete adding html");
      return;
    } 
    // For Products display page
    else if (route === "/DisplayProduct.html") {
      // TOGGLE buttons for view and add
      document.querySelectorAll(`.navbar-nav .toggleButtons`).forEach((btn) => {
        btn.classList.remove("hide-button");
      });
      document
        .querySelector(`.nav-item > .viewButton`)
        .classList.add("hide-button");
      // Fetching html dynamically
      this.addInnerHtml(route, "dynamic-content", title);
      this.waitForElm(".cards-wrapper").then((CardsWrapper) => {
        this.view.cardsWrapper = CardsWrapper;
        this.view.renderCardsView(this.model.productData);
        console.log("=== Cards are ready ===");
      });
      return;
    }
  }
  // Function to find whether element is attached or not
  // And if not attached then wait until it gets attach
  // Used Mutation Observer
  waitForElm(selector) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutations) => {
        console.log(mutations);
        if (document.querySelector(selector)) {
          console.log("Inside observer");
          observer.disconnect();
          return resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
}

let model = new Model();
console.log(model.productData);
let view = new View();
let controller = new Controller(view, model);
view.initController(controller);
controller.getView().init();
window.route = controller.route; // why we are writing this?