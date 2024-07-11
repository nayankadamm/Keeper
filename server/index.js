const express = require('express')
require("./db/config")
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/notes/', require('./routes/noteRoute'));
app.listen(5000,()=>{
    console.log("server started on 5000 port");
})