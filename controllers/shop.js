const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {

  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err) => console.log(err))
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {

  //   })
  //   .catch(err => console.log(err));
  // ;

};

exports.getProduct = (req, res, next) => {

  console.log("here")
  const prodId = req.params.productId;
  console.log(prodId)

  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  // Product.findById(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  // Product.findById(prodId).then((product)=>{
  //   // console.log(product[0][0])
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   })
  // }).catch(err => console.log(err))

  // res.redirect('/')
}

exports.getIndex = (req, res, next) => {


  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => console.log(err))

};

exports.getCartp = (req, res, next) => {

  console.log("rat" + req.user.Cart)
  req.user.getCart()
    .then((c) => {
      return c.getProducts().then((products) => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
      // console.log('c-' + JSON.stringify(c))
    }).catch(err => console.log(err))

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId } })
  })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      let newQuantity = 1;


      if (product) {
        //... handle number of quantity

        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product,{through: { quantity : newQuantity}
        })
      }

      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product,{through: { quantity : newQuantity}
          })
        })

        .catch(err => console.log(err))
    })
    .then(()=>{

      res.redirect('/cart')
    })
    .catch(err => console.log(err))

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postCartDeleteProduct = (req, res) =>{
  const prodId = req.body.productId

  req.user.getCart().then((cart)=>{
      return cart.getProducts({where:{id:prodId}})
  }).then((products)=>{
    const product = products[0];
    return product.cartItem.destroy()
  }).then(()=>{
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}
