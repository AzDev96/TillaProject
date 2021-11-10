module.exports = (req, res, next) => {
    if(req.session.istrue){
        next();
    }
    else{
        res.redirect('login')
    }
}