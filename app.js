const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const apiRoutes = require("./src/modules/routes/routes");



const uri = 'mongodb+srv://user:user@cluster0.19ode.mongodb.net/ReactTodoDB?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})


app.use("/", apiRoutes);

app.listen(8000, () => {
  try {
    console.log('Example app listening on port 8000!')
  }
  catch (err) {
    console.log(err)
  }
});