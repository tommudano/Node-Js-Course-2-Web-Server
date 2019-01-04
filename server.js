const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  // Set express properties

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');  // If I don't call next, what is below does not get logged...
// });

app.use(express.static(__dirname + '/public')); // Middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {  // Req stores data about the request. Res has methods to respond in different ways
  // res.send('<h1>Hello Request!</h1>');  // Content-type is text/html
  // res.send({  // Automatically changes it to JSON Content-type is application/json
  //   name: 'Tom',
  //   likes: [
  //     'Philosophy',
  //     'Magic',
  //     'Calisthenics'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Site!'
  });
});  // Settle a handler for an HTTP request

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  // res.send('About Page');
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    bodyMessage: 'This is our projects page. We hope you enjoy it!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request...'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);  // Pints on cmd
});  // Bind app to host port
// Abro localhost:3000
