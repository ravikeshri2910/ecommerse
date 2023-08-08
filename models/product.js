const fs = require('fs');
const path = require('path');

const db = require('../util/database')

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
      return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',[this.title, this.price, this.imageUrl, this.description] 
      )
    
    
  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products')
  }


  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    
 };

 static deleteById(id){
       return db.execute('DELETE FROM products WHERE products.id = ?',[id])
   

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
