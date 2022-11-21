const express = require('express');
const app = express();
const port = 8000;

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error running server : ${err}`);
        return;
    }
    console.log(`Yup! server is running on port : ${port}`);
});