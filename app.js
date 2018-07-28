const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgrounds = [
   {name: 'Salmon Creek', image: 'https://usatunofficial.files.wordpress.com/2015/08/crane-flat-site-503.jpg'},
   {name: 'Granite Hill', image: 'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-glacier-national-park-camping.jpg.rend.hgtvcom.966.725.suffix/1491593018562.jpeg'},
   {name: 'Mountain Goat Rest', image: 'https://www.straight.com/files/v3/styles/gs_large/public/images/18/06/gettyimages-649155058.jpg?itok=Lhx5ciAR'},
];

app.get('/', (req,res)=>{
   res.render('landing');
});

app.get('/campgrounds',(req,res)=>{
   res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds', (req,res)=>{
   //GET DATA FROM FORM AND ADD TO CAMPGROUNDS ARRAY
   const name = req.body.name;
   const image = req.body.image;
   const newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   //REDIRECT BACK TO CAMPGROUNDS
   res.redirect('/campgrounds');
});

app.get('/campgrounds/new',(req,res)=>{
   res.render('new.ejs');
});

const PORT = 3000;
app.listen(PORT, ()=>{
   console.log(`YelpCamp server has started: PORT: ${3000}`);
});