const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

const Campground = mongoose.model('Campgrounds', campgroundSchema);

// Campground.create({name: 'Granite Hill', image: 'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-glacier-national-park-camping.jpg.rend.hgtvcom.966.725.suffix/1491593018562.jpeg',
// description: "This is a huge granite hill, no bathrooms"
// }, (err, campground)=>{
//    if (err) {
//       console.log(err);
//    } else {
//       console.log('NEWLY CREATED CAMPGROUND');
//       console.log(campground);
//    }
// });


app.get('/', (req,res)=>{
   res.render('landing');
});

app.get('/campgrounds',(req,res)=>{
   //GET ALL CAMPGROUNDS FROM DB
   Campground.find({}, (err,allCampgrounds)=>{
      if (err) {
         console.log(err)
      } else {
         res.render('index',{campgrounds:allCampgrounds}); 
      }
   });
});

//CREATE- ADD NEW CAMPGROUND
app.post('/campgrounds', (req,res)=>{
   //GET DATA FROM FORM AND ADD TO CAMPGROUNDS ARRAY
   const name = req.body.name;
   const image = req.body.image;
   const description = req.body.description;
   const newCampground = {name: name, image: image, description: description};
   //CREATE A NEW CAMPGROUND AND SAVE TO DB
   Campground.create(newCampground, (err, newlyCreated)=>{
      if (err) {
         console.log(err);
      } else {
         //REDIRECT BACK TO CAMPGROUNDS
         res.redirect('/campgrounds'); 
      }
   });
});

app.get('/campgrounds/new',(req,res)=>{
   res.render('new');
});

//SHOW- SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get('/campgrounds/:id', (req,res)=>{
   //FIND CAMPGROUND WITH PROVIDED ID
   Campground.findById(req.params.id, (err, foundCampground)=>{
      if (err) {
         console.log(err);
      } else {
         //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
         res.render('show', {campground: foundCampground});
      }
   });
});

const PORT = 3000;
app.listen(PORT, ()=>{
   console.log(`YelpCamp server has started: PORT: ${PORT}`);
});