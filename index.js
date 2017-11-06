const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { getBotSignal } = require('./libs/ProcessInputString');

const app = express();
const server = app.listen(8080, () => console.log('Server started'));
const io = require('socket.io')(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.post('/fox/startsignal', parser, (req, res) => {
    const { id, name, winrate, enterPrice, isCall } = req.body;
    res.send({ id, name, winrate, enterPrice, isCall });
});

app.post('/fox/result', parser, (req, res) => {
    const { id, isWin } = req.body;
    res.send({ id, isWin });
});

app.get('/bot/start/news/:name', (req, res) => {
    const { name } = req.params;
    res.end();
    io.emit('CREATE_NEWS', { name });
});

app.get('/bot/stop/news/:name', (req, res) => {
    const { name } = req.params;
    res.end();
    io.emit('STOP_NEWS', { name });
});

// http://localhost:8080/bot/start/signal/abcd||USDJPY||1.2322||CALL
app.get('/bot/start/signal/:signalString', (req, res) => {
    const { signalString } = req.params; // ID||NAME||PRICE||CALL
    const signal = getBotSignal(signalString);
    io.emit('BOT_SIGNAL', signal);
    res.end();
});

app.get('/result/signal/:resultString', (req, res) => {
    const { resultString } = req.params;
    res.send(resultString);
});

io.on('connection', socket => {
    console.log(socket.id);
});
