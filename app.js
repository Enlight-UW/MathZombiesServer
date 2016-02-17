var express = require("express");
var app = express();

// variables needed for zombies
var term1, term2, sum, randoNums;

// update these numbers to an initial state
updateNumbers(0);

// start listening
app.listen(8081);

app.get('/getNumbers', function(req, res) {
    console.log("Getting the numbers");
    res.send(getNumbers());
});

app.get('/updateNumbers', function(req, res) {
    console.log("Updating numbers");
    updateNumbers(req.params.count);
    res.send(getNumbers());
});

function getNumbers() {
    return "{\"term1\": " + term1 +
        ", \"term2\": " + term2 +
        ", \"sum\": " + sum +
        ", \"randoNums\": [" + randoNums.join(',') + "]}";
}

function updateNumbers(count) {
    term1 = getRandomNumber();
    term2 = getRandomNumber();
    sum = term1 + term2;

    randoNums = [];

    // get a variety of random numbers
    for(var i = 0; i < count; i++) {
        var temp = 0;
        do {
            temp = getRandomNumber();
        } while(temp == 0 || temp == sum || randoNums.indexOf(temp) > -1);

        randoNums.push(temp);
    }
}

function getRandomNumber() {
    return  Math.floor((Math.random() * 100) + 1);
}