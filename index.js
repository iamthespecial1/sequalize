const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const port = process.env.PORT || 3000;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('testDB', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false
});

app.use('/*', router);
router.get('/', function (req, res, next) {
    User.findAll({
        attributes: ['id', 'firstname']
      }).then(users => {
        res.send(users);
    }) 
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
//add routes to express app
// routes(app);

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
/* User.sync().then(() => {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
}); */

app.use(bodyParser.json());
// app.use('/new_table', new_table)
//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('mysql API server started on: ' + port);