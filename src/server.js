const routes = require('./routes/index.js')

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('/public/'));

global.admin = false;




app.use('/api/', routes);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/error.html');
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Escuchando en ${PORT}`);
})

