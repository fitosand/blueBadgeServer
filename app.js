require('dotenv').config();

// here we are invoking Node's require() function, and specifying the name of the module we want to import. This would not work if we did not install express as a dependency
const Express = require('express');

// here we are making a new instance of Express, which will unlock the use of HTTP requests, middleware functionality, and some of the other basic application settings
const app = Express(); 


//import the database connection
const database = require('./db');

database.sync();

app.use(Express.json());

app.use(require('./middleware/headers'))

//SERVING A STATIC FILE
app.use(Express.static(__dirname + '/public'));
console.log(__dirname);

//gives us the webpage when we go to the '/' endpoint:
app.get('/', (request, response) => response.render('index'));

//import the pie controller
const log = require('./controllers/pointcontroller');

app.use('/log', log);

const user = require('./controllers/usercontroller');
app.use('/user', user);


//this will start our server on the port number we supply, and will console.log a message telling us the server is running

app.listen(process.env.PORT, function(){ console.log(`app is listening on port ${process.env.PORT}`)});
