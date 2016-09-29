var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/:articleName', function (req, res) {
 
//Express Framework after : take in var  
//articles[articleName]=={} content object for article one
var articleName=req.params.articleName;       
res.send(createTemplate(articles[articleName]));

});


var articles = {
'article-one': {
title: '1 | Sarvesh',
heading: '1',
date: 'Sep 5,2016',
content: `  <B><MARQUEE> 1 </MARQUEE><B>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
                        <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>`
},
c2: {
title: '2 | Sarvesh',
heading: '2',
date: 'Sep 10,2016',
content: `  <B><MARQUEE> 2 </MARQUEE><B>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
                        <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>`
},
3 : {
title: '3 | Sarvesh',
heading: '3',
date: 'Sep 15,2016',
content: `  <B><MARQUEE> 3 </MARQUEE><B>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
                        <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>
            <p>
                This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.This is my page.
            </p>`
}
};
 
function createTemplate(data) {
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;
var htmlTemplate=`
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>
        ${date}
        </div>
        <div>
        ${content}
        </div>
        </div>
    </body>
</html>`;
return htmlTemplate;
}

app.get('/:articleName', function (req, res) {
var articleName=req.params.articleName;       
res.send(createTemplate(articles[articleName]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});





