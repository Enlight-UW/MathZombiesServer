var express = require("express");
var app = express();

// variables needed for zombies
var term1, term2, sum, randoNums;

// update these numbers to an initial state
updateNumbers(10);

// start listening
app.listen(80);

app.get('/getNumbers', function(req, res) {
    console.log("Getting the numbers");
    res.send(getNumbers());
});

app.get('/updateNumbers/:count', function(req, res) {
    var count = req.params.count;
    console.log("Updating numbers with " + count + " random numbers!");
    updateNumbers(count);
    res.send(getNumbers());
});

function getNumbers() {
    return "{\"term1\": " + term1 +
        ", \"term2\": " + term2 +
        ", \"sum\": " + sum +
        ", \"randoNums\": [" + randoNums.join(',') + "]}";
}

// checks if it is integer
function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function updateNumbers(count) {

    // bind count
    if(isInt(count)) {
        if (count < 0) {
            count = 0;
        } else if (count > 5) {
            count = 5;
        }
    }

    term1 = getRandomNumber(0, 30);
    term2 = getRandomNumber(0, 30);
    sum = term1 + term2;

    randoNums = [];

    var low = sum - 10;
    var high = sum + 10;

    // get a variety of random numbers
    for(var i = 0; i < count; i++) {
        var temp = 0;
        do {
            temp = getRandomNumber(low, high);
        } while(temp == 0 || temp == sum || randoNums.indexOf(temp) > -1);

        randoNums.push(temp);
    }
}

function getRandomNumber(low, high) {
    var newLow = Math.max(low, 0);
    return  Math.floor((Math.random() * (high - newLow + 1)) + newLow);
}
