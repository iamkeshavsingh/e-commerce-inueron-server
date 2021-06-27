require('dotenv').config();
const express = require('express');
const app = express();

const apis = require('./routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apis);

const port = process.env.PORT | 5000;

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});
