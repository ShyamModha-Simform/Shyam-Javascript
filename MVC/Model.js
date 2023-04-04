
// 👇️ using ES Modules syntax
const _ = require(["lodash"]);

module.exports = class Model {
    constructor() {
      this.productData = [];
      // console.log(Array.isArray((localStorage.getItem('productData'))));
      if(Array.isArray(JSON.parse(localStorage.getItem('productData')))){
          this.productData = JSON.parse(localStorage.getItem('productData'));
      }
    }
  
    setProductData(product) {
      this.productData.push(product);
      localStorage.setItem('productData',JSON.stringify(this.productData));
    }
  
    getProductData() {
      return this.productData;
    }
  }
