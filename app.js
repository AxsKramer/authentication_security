const express = require('express');
const router = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use('/', router);

app.listen(port, () => console.log('Server running on port: ',port));