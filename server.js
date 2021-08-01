require('dotenv').config();
const express = require('express');
const app = express();
var sequelize = require('./config/db.config');
const cors = require('cors')
const path = require('path')
require('./models')

const apis = require('./routes');


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sequelize.sync({ force: true }).then(() => {
//     console.log('New Tables Created Successfully');
// })

app.use('/product-image', express.static(path.join(__dirname, 'images')))

app.use('/api', apis);


const port = process.env.PORT | 5000;

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});
