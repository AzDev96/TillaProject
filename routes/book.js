const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/Book')
const fs = require('fs');
/* Controller */
const BookController = require('../controller/book')

/* UPLOADS IMAGES */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null,  `${file.fieldname}_${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage}).single('image')

/* GET home page. */
router.get('/add', BookController.getBook);

/* ADD BOOK */
router.post('/add',  upload, BookController.AddpostBook)

/* EDIT BOOK */
router.get('/edit/:id', BookController.BookIdEdit)

/* ================   EDIT POST    ================ */
router.post('/update/:id', upload, BookController.BookIdupdatePost)

/* ================  DELETE    ================ */
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  await Book.findByIdAndRemove(id, (err, data) => {
    if(data.image != '') {
       try{
        fs.unlinkSync(`./uploads/${data.image}`)
       } 
       catch(err) {
         console.log(err);
       }
    }
    if(err) {
      console.log(err)
    }
    else{
      res.redirect('/')
    }
  })
})

router.get('/show/:id',  BookController.show);


module.exports = router;
