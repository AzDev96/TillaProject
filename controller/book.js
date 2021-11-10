const Category = require('../models/Category')
const Book = require('../models/Book')
const fs = require('fs');
exports.getBook = async (req, res, next) => {
    const category = await Category.find();
    res.render('book/book-add', {
      category
    });
}
exports.AddpostBook  = async (req, res, next) => {
  const {image, category, proba, tosh, massa, massaAll,qaerniki, price, priceAll,} = req.body
  const book = await new Book({
    proba: proba,
    toshi: tosh,
    AllVazni: massaAll,
    ToshBilanVazni: massa,
    qaerniki: qaerniki,
    OlinganNarxi: price,
    SotilishNarxi: priceAll,
    image: req.file.filename,
    category_id: category,
  })
  await book.save(err => {
    if(err) {
      console.log(err);
    }
    else{
      res.redirect('/')
    }
  })
}

exports.BookIdEdit = async (req, res, next) => {
  const id = req.params.id;
   await  Book.findById(id, (err, book) => {
      if(err)
         console.log(err);
      else{
         if(book == null) {
           res.redirect('/');
         }else{
           res.render('book/book-edit', {
               book
           })
         }
      }   
    })
}
exports.BookIdupdatePost = async (req, res, next) => {
  const id = req.params.id
  let new_image = '';
  if(req.file){
     new_image = req.file.filename
     try{
       fs.unlinkSync(`./uploads/${req.body.old_image}`)
     }catch(err){
       console.log(err)
     }
  }
  else{
    new_image = req.body.old_image
  }
  await Book.findByIdAndUpdate(id, {
    proba: req.body.proba,
    toshi: req.body.toshi,
    ToshBilanVazni: req.body.ToshBilanVazni,
    AllVazni: req.body.AllVazni,
   image: new_image,
   qaerniki: req.body.qaerniki,
   OlinganNarxi: req.body.OlinganNarxi,
   SotilishNarxi: req.body.SotilishNarxi
  }, (err, data) => {
     if(err) 
      console.log(err)
      else{
        res.redirect('/')
      }
  })
}
exports.show = async (req, res, next) => {
    const id = req.params.id
    const book = await Book.findById(id).populate('category_id');
    console.log(book)
    res.render('book/book-show', {
       books: book,
    });
}