const path = require('path')

const bodyParser = require('body-parser')
const express = require('express')
// const morgan = require('morgan')

const root = path.join(__dirname, 'public')
const app = express();
app.use(bodyParser.text())
// app.use(morgan('dev'))
app.use(express.static(root))

app.listen(3000, () => {
  console.log("server is listening to PORT:3000");
});
