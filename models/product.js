const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

// const p = path.join(path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

const p = path.join(__dirname, '..', 'data', 'products.json')

const getProductsFromFile = (cb)=> {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id =id,
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    
    getProductsFromFile(products => {

      if(this.id){
        const existingProductIndex = products.findIndex((prod)=> prod.id ===this.id)

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }

      else{

        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  // static findById(id, cb) {
  //   getProductsFromFile((products) => {
  //     const product = products.find((p) => p.id === id);
  //     console.log(product)
  //     cb(product)
  //   })
  // }

  static findById(id,cb){
    
    fs.readFile(p, (err, fileContent) => {
           let res;
           if (err) {
              return([])
           } else {
             res = JSON.parse(fileContent)
           }

        const product = res.find((p) => p.id === id);
        console.log("product" + product)
        // return product
          cb(product)
        // Cart.addProduct(id, product.price)
     });
 };

 static deleteById(id){
       
    fs.readFile(p, (err, fileContent) => {
      let res;
      if (err) {
         return([])
      } else {
        res = JSON.parse(fileContent)
      }

      // let product = res.find((prod) => prod.id === id)
      let updatedProduct = res.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        console.log(err);
        // if(!err){
        //   Cart.deleteProduct(id, product.price)
        // }
      });
      

    });

 }


};

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   // console.log(prodId);
//   Product.findById(prodId, (product) =>{
//     Cart.addProduct(prodId, product.price)
//   })
//   res.redirect('/cart')
// }

// const p = path.join(__dirname , '..', 'data', 'products.json')

// const getProductsFromFile =( cb )=> {


  //static findById(id)=>{

  
//   fs.readFile(p, (err, fileContent) => {
  //let res;
//     if (err) {
       // res=[]
//       cb([]);
//     } else {
//      res = JSON.parse(fileContent)
          //cb(JSON.parse(fileContent));
//     }

//  const product = res.find((p) => (p.id === id);

      // Cart.addProduct(id, product.price)
//   });
// };
