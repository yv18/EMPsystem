const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rajyashrajkishorsinh:Raj2329@cluster0.bu58mey.mongodb.net/_Emp');
mongoose.connection.on("connected", function(){
    console.log("Backend connected successfully"); // to display the success message when connection is established
})

// so here I have connected my backend to the database using mongoDB connection string.
