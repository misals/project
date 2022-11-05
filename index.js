const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err) {
    if(err) {
        console.log(`Error running server : ${err}`);
        return;
    }
    console.log(`Yup! sserver is running on port : ${port}`);
});