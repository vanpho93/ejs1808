const express = require('express');
// template engine
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home'));

app.listen(3000, () => console.log('Server started'));
