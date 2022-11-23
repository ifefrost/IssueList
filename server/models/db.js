const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:s1mplePass@cluster0.zxiu4km.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on("connected", function(){
    console.log("Application is connected to the Database");
})