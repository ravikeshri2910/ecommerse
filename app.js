const path = require('path');
const sequelize = require('./util/database')

const express = require('express');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart_item')

const errorController = require('./controllers/error');

const app = express();

// db.execute('SELECT * FROM products')
// .then(result =>{
//     console.log(result[0])
// })
// .catch(err => console.log(err))// Database

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1)
  .then((user)=>{
    req.user = user
    next()
    console.log('tuser'+ user)
  })
  .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints : true , onDelete : 'CASCADE'});
User.hasMany(Product)
User.hasOne(Cart)
// Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem})
// Product.belongsToMany(Cart,{through : CartItem})




sequelize
  // .sync({force : true})// it overwite the tables 
  .sync()
  .then(result => {
    // console.log(result);
    return User.findByPk(1);
  }).then((user)=>{
    if(!user){
      user =User.create({id:1,name : 'Max',email : 'test@test.com'})
      return user
    }else{
      return user
    }
  }).then(user =>{
    // console.log(User)
    return user.createCart()
  }).then((cart)=>{
    app.listen(3000);

  })
  
  .catch(err => {
    console.log(err);
  });

// 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
