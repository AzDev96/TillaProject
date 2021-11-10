const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../midllewere/Auth')

const isAuth = (req,res,next) => {
      if(req.session.istrue){
        next();
      }
    else{
        res.redirect('login')
    }
}

/* GET home page. ASOSIY SAHIFA  */  
router.get('/',  async function(req, res, next) {
  const book = await Book.find().populate('category_id');
  res.render('index', {
    books: book,
    message: req.flash("success")
  });
});




/* GET home page. ASOSIY SAHIFA  */  
router.post('/logaut', async function(req, res, next) {
  req.session.destroy((err) => {
    if(err) console.log(err);
    res.redirect('/')
  })
});





/* ======   login   ======  */
router.get('/login', async function(req, res, next) {
  res.render('login', {message: req.flash('error')})
});

router.post('/login', async function(req, res, next) {
   const {email, pass} = req.body
   const user = await User.findOne({email}) // asd@asd
   if(!user){
      req.flash('error', "EMAIL NATOGRI")
      return res.redirect('login');
   }   
   const isPass = await bcrypt.compare(pass, user.password)
   if(!isPass){
    req.flash('error', "Parol Notogri")
     return res.redirect('login')
   }
   req.flash("success", "Hush kelibsuz")
   req.session.istrue = true
   console.log(req.session);

   res.redirect('/')
});








/* ======   REGISTER   ======  */
router.get('/register', async function(req, res, next) {
    res.render('register')
});


router.post('/register', async function(req, res, next) {
     const {name, pass, email} = req.body;
     const usersEmail = await User.findOne({email});
     if(usersEmail) {
       return res.redirect('/register')
     }
     const hassPass = await bcrypt.hash(pass, 12);
     const user = await new User({name, password: hassPass, email})
     await user.save();
     res.redirect('/login')
});






module.exports = router;
