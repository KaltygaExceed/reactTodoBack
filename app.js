const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require("./src/modules/middleware/errorHandler");
const app = express();
const apiRoutes = require("./src/modules/routes/routes");

app.use(cors())
app.use(bodyParser.json())
app.use("/", apiRoutes);
app.use(errorHandler)


const uri = 'mongodb+srv://user:user@cluster0.19ode.mongodb.net/ReactTodoDB?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})




app.listen(8000, () => {
  try {
    console.log('Example app listening on port 8000!')
  }
  catch (err) {
    console.log(err)
  }
});