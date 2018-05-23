const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//     var now = new Date().toString();
//     var log = `${now}: ${req.method} ${req.url} \n`;
//     console.log(log);
//     fs.appendFile('log.txt',log, (err)=>{
//         if(err){
//             console.log('errorrrrrrrrrrrr');
//         }
//     });
//     next();
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;
    console.log(log);
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.log('errorrrrrrrrrrrr');
        }
    });

    if (req.url.indexOf('?') > -1) {
        res.render('error.hbs');
    }
    console.log("wwwwwwwwwwww");
    next();

    // WE NEED TO WATCH 4.7
     ///////////////////
    //////////////////////
    /////////////////////
    / ADDING VERSION CONTROL
    ///////////////////
    //////////////////////
    /////////////////////

});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        messages: [
            'hello message1',
            'hello message2',
        ]
    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'bad bad bad guitar' });

});
app.listen(3000, () => {
    console.log('server is up');
});