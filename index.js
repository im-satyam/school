const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use('/v1', require('./routes/schoolRoutes'));
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
