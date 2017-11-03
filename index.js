const express = require('express');
const reload = require('reload'); // eslint-disable-line

// template engine
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));

reload(app);

app.listen(3000, () => console.log('Server started'));
