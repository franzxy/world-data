// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
const express = require('express');
const app = express();
const sys = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const csvConverter = require('csvtojson');

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csvtojson *********************************
**************************************************************************/
let data

// convert csv to json and write to data
csvConverter()
  .fromFile("world_data.csv")
  .then((json) => {
    data = json
  })

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

// using status code 400 for all errors

// GET

app.get('/items', (req, res) => {
  // return all data
  return res.send(data);
});

app.get('/items/:id', (req, res) => {
  // find item in data where its id matches the params id
  let result = data.find(item => item.id === req.params.id)
  if (result) {
    return res.send(result)
  } else {
    return res.status(400).send(`No such id ${req.params.id} in database.`);
  }
});

app.get('/items/:id1/:id2', (req, res) => {
  // check if first id exists
  let input1 = data.find(item => item.id === req.params.id1)
  // check if second id exists
  let input2 = data.find(item => item.id === req.params.id2)
  // get all data between the two ids (I am including both params ids here)
  let result = data.filter(item => {
    return item.id >= req.params.id1 && item.id <= req.params.id2
  })
  if (input1 && input2 && result) {
    return res.send(result)
  } else {
    return res.status(400).send('Range not possible.');
  }
});

app.get('/properties', (req, res) => {
  // map the data
  return res.send(... new Map(
    data
      // get property name
      .map(a => Object.keys(a))
      // only keep one instance of each property
      .map(v => [JSON.stringify(v), v])
    ).values()
  );
});

app.get('/properties/:num', (req, res) => {
  // create array tp use map, then get its first child ^^
  let result = [... new Map(
    data
      // get property name
      .map(a => Object.keys(a))
      // only keep one instance of each property
      .map(v => [JSON.stringify(v), v])
    ).values()][0][req.params.num]
  if (result) {
    return res.send(result)
  } else {
    return res.status(400).send('No such property available.');
  }
});

// POST

app.post('/items', (req, res) => {
  // if the req body has a name property and 2 additional properties push to data
  if (req.body.name && Object.keys(req.body).length >= 3) {
    data.push(req.body)
    return res.send(`Added country ${req.body.name} to list!`)
  } else {
    return res.status(400).send('Invalid object.');
  }
});

// DELETE

app.delete('/items', (req, res) => {
  // pop last element of array and return its name
  return res.send(`Deleted last country: ${data.pop().name}!`);
});

app.delete('/items/:id', (req, res) => {
  // check if requested id exists inside data array
  let result = data[req.params.id]
  if (result) {
    // splice the requested id
    data = data.splice(req.params.id)
    // return the name of the deleted element
    return res.send(`Item ${result.name} deleted successfully.`);
  } else {
    return res.status(400).send(`No such id ${req.params.id} in database`);
  }
});

// DO NOT CHANGE!
// bind server localhost to port 3000
const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
