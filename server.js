// server.js
// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// require axios 
var axios = require('axios')

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/api', function (req, res) {
    db.Record.find({}, function(err, records) {
        res.json(records);
    });
});

app.get('/api/:id', function (req, res) {
    db.Record.findOne({_id:req.params.id}, function(err, record){
        if (err) {console.log("Couldn't find selected record.")
            return;
        }
        res.json(record);
    });
});

jobQueue = []

app.put('/api/:id', function(req, res){
    currentJobURL = jobQueue.shift()
    axios.get(currentJobURL).then(function(response){
        stringData =`${response.data}`
        db.Record.findOne({_id:req.params.id}, function (err, foundRecord){
            if(err){console.log("Error findind record to update.")}
            foundRecord.jobHTML = stringData; 
            foundRecord.save(function(err, savedRecord){
                if(err) {console.log('Error saving updated record.')}
                res.json(savedRecord)
            })
        })
    })
});

app.post('/api', function (req, res){
    let jobURL = req.body.userInput;
    record = db.Record({
        jobHTML: "Job has not been completed yet."
    })
    record.save(function(err, record){
        if(err) {return console.log(err);}
        res.json(record)
    });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/')
})
