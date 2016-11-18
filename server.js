var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');



var app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());



var config = {
  host: 'db.imad.hasura-app.io',
  port: '5432',
  user: 'sarvesh18',
  //password: 'db-sarvesh18-95101',
  database: 'sarvesh18',
  password: process.env.DB_PASSWORD 
};



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$'); 
}

//Post Request
app.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
	var salt = crypto.randomBytes(128).toString('hex');       
	var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        res.send('User Successfully Created:'+username);
    } 
  });
});

//Post Request
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        if(result.rows.length == 0) {
            res.send(403).send('Username/Password is Invalid');
        }
        else {
           var dbString = result.rows[0].password;
           var salt = dbString.split('$')[2];
           var hashedPassword  = hash(password, salt);
           if(hashedPassword == dbString) {
            res.send('Credentials Correct!');
            //Set a Session
           }
           else {
            res.send(403).send('Username/Password is Invalid');
           } 
          }
         }
        });
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



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


var pool = new Pool(config);

app.get('/:test-db', function (req, res) {

	//make a select request
        //return a response with the results
	pool.query('SELECT * FROM test',function(err, result) {
         if(err) {
          res.status(500).send(err.toString());
         } else {
          res.send(JSON.stringify(result));
          res.send(JSON.stringify(result.rows));//Only Rows
         }
	});


});


