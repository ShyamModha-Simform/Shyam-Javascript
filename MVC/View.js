
// 👇️ using ES Modules syntax
import _ from 'lodash';

module.exports = class View {
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
          productName : document.querySelector(".product-name-input").value,
          productID : document.querySelector(".product-id-input").value,
          productPrice : document.querySelector(".product-price-input").value,
          productDetails : document.querySelector(
            ".product-details-input"
          ).value,
          productImage: document.querySelector(".product-image-input").value,
      };
    }
  
    onSubmitEvent() {
      this.submitForm.addEventListener("click", (e) => {
          // context
          console.log("Onclick performed", this.readDataFromInputs())
          this.controller.setDataIntoModel(this.readDataFromInputs());
          this.renderCardsView(model);
      });
    }
  
    init(model) {
      this.renderCardsView(model);
      this.onSubmitEvent(model);
    }
  
    renderCardsView(model){
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
            </div>
          </div>
        </div>`;
    }
  }