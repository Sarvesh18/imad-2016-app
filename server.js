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
var pool = new Pool(config);
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
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>
                  ${heading}
              </h3>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
              <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
    return htmlTemplate;
}






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/Sarvesh', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Sarvesh.html'));
});
////////////////////////////////////////////////////////////////////////////////
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$'); 
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input,'salt');       
    res.send(hashedString);
});

//Post Request
app.post('/submit', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var likes = req.body.likes;
    pool.query('INSERT INTO "add" (name, email, subject, likes) VALUES ($1, $2, $3, $4)', [name, email, subject, likes], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        res.send('Respond Successfully Added:');
    } 
   });
});

//Post Request
app.post('/signup', function (req, res) {
    var usernameS = req.body.usernameS;
    var passwordS = req.body.passwordS;
    var emailS = req.body.emailS;
	var salt = crypto.randomBytes(128).toString('hex');       
	var dbString = hash(passwordS, salt);
    pool.query('INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3)', [usernameS, dbString,  emailS], function(err, result) {
    if(err) {
        res.status(500).send(err.toString());
    } 
    else {
        res.send('User Successfully Registered:');
    } 
  });
});

//Post Request
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT id, password FROM "user" WHERE username = $1', [username], function(err, result) {
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

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       //res.send('You are logged In:' + req.session.auth.userId.toString());
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } 
	       else {
              res.send(result.rows[0].username);    
           }
       });
   } 
   else {
       //res.send('You are ! logged in');
       res.status(400).send('You are ! logged in');
   }
});

app.get('/logout', function (req, res) {
	delete req.session.auth;       
	res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');

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

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});

app.get('/articles/:articleName', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

//app.get('/ui/madi.png', function (req, res) {
// res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
//});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
/*
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
