const express = require('express');
const reload = require('reload'); // eslint-disable-line

// template engine
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

const arrX = [
    { name: 'Ti', age: 10 },
    { name: 'Teo', age: 11 },
    { name: 'Tun', age: 12 },
];

app.locals.arrPeo = arrX;

app.get('/', (req, res) => res.render('home'));

app.get('/learn', (req, res) => res.render('learn', { username: 'khoapham' }));

reload(app);

app.listen(3000, () => console.log('Server started'));
