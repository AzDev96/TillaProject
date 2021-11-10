const express = require('express');
const router = express.Router();
const Category = require('../models/Category');



/* GET home page. */
router.get('/add', async function(req, res, next) { 
 
  res.render('category/categ-add');
});

router.get('/all', async function(req, res, next) { 
  const categoryAll = await Category.find();
  try { 
    if(categoryAll) {
      res.render('category/categody-list', {
        categoryAll
      })
    }else{
      console.log(`Xatolik bor`);
    }
  }catch(err ) {
    console.log(err);
  }
});



/* GET home page. */
router.post('/add', async function(req, res, next) {
    const categ = await new Category({name: req.body.name})
    await categ.save(err => {
      if(err) {
        console.log(err);
      }
      else{
        res.redirect('/')
      }
  })
});



module.exports = router;
