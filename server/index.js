const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getEvents', (req,res) => {
    queryEvents();
});

app.get('/api/getUsers', (req,res) => {
    queryUsers();
});

app.get('/api/addUser', (req,res) => {
    username = req.query.username;
    id = req.query.id;
    addUserToDatabase(id, username);
});

app.get('/api/addEvent', (req,res) => {
    userId = req.query.userId;
    id = req.query.id;
    eventType = req.query.eventType;

    addEventToDatabase(id, userId, eventType);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: '',
            password: '' 
        },
        type: 'default'
    },
    server: '',
    options:
    {
        database: 'dbleivalle', 
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through


function queryUsers()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM dbo.tbluser",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function queryEvents()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM dbo.tblevent",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}


function addUserToDatabase(id, username)
{
    console.log(`Adding user ${username}`);

    // Read all rows from table
    var request = new Request(
        `INSERT INTO [dbo].[tbluser] (ID, usrname) VALUES (${id}, '${username}')`,
        function(err, rowCount, rows)
        {
            console.log(err);
        }
    );
    connection.execSql(request);
}

function addEventToDatabase(id, userId, eventType)
{
    console.log(`Adding ${eventType} to ${userId}`);
    
    // Read all rows from table
    var request = new Request(
        `INSERT INTO [dbo].[tblevent] (ID, userid, beveragetype) VALUES (${id}, ${userId}, '${eventType}')`,
        function(err, rowCount, rows)
        {
            console.log(err);
        }
    );
    connection.execSql(request);
}