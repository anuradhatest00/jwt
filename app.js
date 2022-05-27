const express = require('express');
const user = require('./routers/user');
const studnet = require('./routers/student');
const auth = require('./middleware/auth,js');

const app = express();

app.use(express.json());

app.use('/api/user',user);
app.use('/api/student',auth,studnet);



const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`App is running on port ${port}`));