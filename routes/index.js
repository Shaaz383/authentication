var express = require('express');
var router = express.Router();

const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local')

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/create' ,async function(req,res){
//   await userModel.create({
//     username : "Imran",
//     nickname : "Nazir",
//     description : "I am a Sewing Tailor " ,
//     categories :['Lahenga', 'Suit' , 'Blouse'],
   
//   })
//   res.send("USer added")
// })

// router.get('/find' ,async function(req,res){
//   // let regex = new RegExp("^Shaaz123$" , 'i')
//   // let userFounded = await userModel.find({username : regex})
//   let userFounded = await userModel.find({categories : {$all : ['Suit']}})
//   console.log(userFounded);
//   res.send(userFounded)
// })


//Passport 

router.get('/profile' ,isLoggedIn, function(req,res){
  res.render('profile')
})


router.post('/register' , function(req,res){
  var userdata = new userModel({
    username : req.body.username,
    secret : req.body.secret ,
  })
  userModel.register(userdata , req.body.password)
    .then(function(registereduser){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/profile/')
      })
    })
})

router.post('/login',passport.authenticate("local" , {
  successRedirect:'/profile/' ,
  failureRedirect:"/"
}) , function(req,res){

})

router.get('/logout' , function(req,res,next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/")
  })
})


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}







module.exports = router;
