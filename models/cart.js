
const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'cart.json')

module.exports = class Cart {
    static addProduct(id, productPrice) {

    //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };// If there is an error reading the file, it initializes a new cart object with empty products and total price.

            if (!err) {
                cart = JSON.parse(fileContent);//If the file is read successfully, it parses the JSON   data and assigns it to the cart variable.
            }


 // Analyse the cart => Find existing product

            const existingProductIndex = cart.products.findIndex((prod) => prod.id === id); // it checks if the product with the given id already exists in the cart by using the findIndex method on the cart.products array
            console.log('existingProductIndex:-'+ existingProductIndex)

            let existingProduct = cart.products[existingProductIndex]
            console.log('existingProduct:-'+ existingProduct)
            let updatedProduct;
 // Add the product/ Increase quantity

            if (existingProduct) { //If it exists, it updates its quantity by one and updates the cart/products array

                updatedProduct = { ...existingProduct };// is using the spread syntax (...) to create a new object updatedProduct that has the same properties and values as existingProduct. 
                updatedProduct.qty = updatedProduct.qty + 1;

                
                // console.log('updatedProduct.qty:-'+ updatedProduct.qty)

                // cart.products = [...cart.products];
                // console.log('cart.products:-'+ cart.products)

                cart.products[existingProductIndex] = updatedProduct;
            
            } else {
                // If it existingProduct doesn't exist, it adds a new product object with a quantity of one to the cart.products array.
                updatedProduct = { id: id, qty: 1 };
               
                // cart.products = [...cart.products, updatedProduct]
                cart.products.push(updatedProduct)

            }

            //Finally, it updates the total price of the cart by adding the productPrice parameter to the current total price
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            // It then writes the updated cart object to the cart.json file using the fs.writeFile method.
            fs.writeFile(p, JSON.stringify(cart), err =>{
                console.log(err)
            })
        })

    }
}