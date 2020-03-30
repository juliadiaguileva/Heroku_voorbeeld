// neem express-module en steek functionaliteit in constante
const express = require('express');
// const port = 5000;

// constante aanmaken die als webserver zal dienen
const app = express();

// Vertel aan webserver dat ik gebruik maak van view engine en dan ook van dewelke, nl. EJS
app.set("views", "views");
app.set("view engine", "ejs");


// vertel aan webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// webserver luister naar GET-commando van verschillende pagina's
app.get("/", function(request, response){
  // vanuit de views-map de juiste pagina halen en renderen
  response.render("home");
});
app.get("/blog", function(request, response){
  response.render("blog");
});

app.get("/blog/:blogid", function(request, response){
  response.send("blogbericht nr: "+request.params.blogid);
});
app.get("/contact", function(request, response){
  response.render("contact");
});


// databestand inladen
const blogposts = require('./data/portfolio.json');


app.get('/portfolio', function(req,res){
  res.render('portfolio', {
    // Array van blogberichten doorgeven aan de renderfunctie om op de homepagina te tonen.
    posts: blogposts.images
  });
});


// route naar "homepagina" laten werken
app.get('/portfolio/:postid', function(req,res){
  res.render('detail', {
    post: blogposts.images[req.params.postid]
  });
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

// Wanneer de URL niet gevonden werd in bovenstaande, gebruik dan de 404
// app.use(function(request, response){
//   response.statusCode = 404;
//   response.render("404");
// });
// server opstarten en beschikbaar maken via URL
