const express = require('express');
const bodyParser = require('body-parser');

const ejs = require('ejs');




const app = express();

// //seta o caminho especifico para os html's dinamicos
app.set('views', './view') // specify the views directory
app.set('view engine', 'html') // sets the template engine
app.engine('html',ejs.renderFile);
// //permitir acesso ao Js e css
app.use('/static', express.static('../view/'));
app.use('/callendar', express.static('node_modules/'))
// //finish2

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.get('/',(req,res)=>{
    res.send('Ok')
})

app.get('/tt',(req,res)=>{
    res.render('agenda')
})

require('../controllers/authController')(app);
require('../controllers/projectController')(app);

app.listen(3001);