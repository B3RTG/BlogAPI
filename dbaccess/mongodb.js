// test mongoose
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_CONECTION_STRING //require('./mongoDbConfig').ConecciontString

//Conect database
mongoose.connect(connectionString).then(()=>{
    console.log('Conecction stablised');
}).catch((err) => {
    console.log(err);
});




