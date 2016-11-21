var express = require('express');
var morgan = require('morgan');
var path = require('path');
////////////////////////////////////////////////////////////////////////////////
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
////////////////////////////////////////////////////////////////////////////////
var config = {
  user: 'sarvesh18',
  database: 'sarvesh18',
  host: 'db.imad.hasura-app.io',
  port: '5432', //password: 'db-sarvesh18-95101',
  password: process.env.DB_PASSWORD //Environment Variable
};
////////////////////////////////////////////////////////////////////////////////
var app = express();
app.use(morgan('combined'));
////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(session({
   secret: 'someRandomSecretValue',
   cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }//Millisec
}));
////////////////////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
////////////////////////////////////////////////////////////////////////////////
var pool = new Pool(config);
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$'); 
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input,'salt');       
    res.send(hashedString);
});

//Post Request
app.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
	var salt = crypto.randomBytes(128).toString('hex');       
	var dbString = hash(passwordR, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        res.send('User Successfully Created:'+username);
    } 
  });
});

app.get('/:test-db', function (req, res) {

    var username = "sar"; 
	pool.query('INSERT INTO "test" (name) VALUES ($1)', [name], function(err, result) {
         if(err) {
          res.status(500).send(err.toString());
         } else {
          res.send('User Successfully Created:'+name);
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
        if(result.rows.length === 0) {
            res.send(403).send('Username/Password is Invalid');
        }
        else {
           var dbString = result.rows[0].password;
           var salt = dbString.split('$')[2];
           var hashedPassword  = hash(password, salt);
           if(hashedPassword == dbString) {
            req.session.auth = {userId: result.rows[0].id};
            res.send('Credentials Correct!');
           }
           else {
            res.send(403).send('Username/Password is Invalid');
           } 
        }
    }
   });
});
/*
//Post Request
app.post('/add', function (req, res) {
    var nameA = req.body.nameA;
    var emailA = req.body.emailA;
    var subjectA = req.body.subjectA;
    var likeA = req.body.likeA;
    pool.query('INSERT INTO "add" (name, email, subject, like) VALUES ($1, $2, $3, $4)', [nameA, emailA, subjectA, likeA], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        res.send('User Successfully Created:'+subjectA);
    } 
   });
});
*/

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } 
	   else {
              res.send(result.rows[0].username);    
           }
       });
       //res.send('You are logged In:' + req.session.auth.userId.toString());
   } 
   else {
	 //  res.send('You are ! logged In');
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {

	delete req.session.auth;       

	res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');

});

/*
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

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});
////////////////////////////////////////////////////////////////////////////////
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

*/
////////////////////////////////////////////////////////////////////////////////
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

//app.get('/ui/favicon.ico', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
//});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
