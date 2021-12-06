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
// GET

app.get('/items', (req, res) => {
  return res.send(data);
});

app.get('/items/:id', (req, res) => {
  let result = data.find(item => item.id === req.params.id)
  if (result) {
    return res.send(result)
  } else {
    return res.status(400).send(`No such id ${req.params.id} in database.`);
  }
});

app.get('/items/:id1/:id2', (req, res) => {
  let input1 = data.find(item => item.id === req.params.id1)
  let input2 = data.find(item => item.id === req.params.id2)
  let result = data.filter(item => {
    return item.id > req.params.id1 && item.id < req.params.id2
  })
  if (input1 && input2 && result) {
    return res.send(result)
  } else {
    return res.status(400).send('Range not possible.');
  }
});

app.get('/properties', (req, res) => {
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
  if (req.body.name && Object.keys(req.body).length >= 3) {
    data.push(req.body)
    return res.send(`Added country ${req.body.name} to list!`)
  } else {
    return res.status(400).send('Invalid object.');
  }
});

// DELETE

app.delete('/items', (req, res) => {
  return res.send(`Deleted last country: ${data.pop().name}!`);
});

app.delete('/items/:id', (req, res) => {
  let result = data[req.params.id]
  if (result) {
    data.splice(req.params.id)
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
