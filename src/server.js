require('dotenv').config();
const express = require('express')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const APIRoutes = require('./routes/api')
const connection = require('./config/database')
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

configViewEngine(app);

app.use('/',webRoutes)
app.use('/api/v1',APIRoutes)

//test connection

// connection.query(
//   'SELECT * FROM Users u',
//   function(err, results, fields){
//     //console.log("...",results);
//   }
// )

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})