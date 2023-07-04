const db_link = "mongodb+srv://divyanshisahu126:Doyourwork%401234@cluster0.gqirdvu.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

mongoose
    .connect(db_link)
    .then(function (db) {
        console.log("user db connected");
       
    })
    .catch(function (err) {
        console.log(err);
    });
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required:true,
        },
        age:{
            type:Number,
            required:true
        },
        College:{
            type: String,
            required:true,
        },
        Branch:{
            type: String,
            required:true,
        },
        email: {
            type: String,
            required:true,
            unique: true
        },
        password: {
            type:String,
            required:true
        }
    
    })

    const  UserModule = new mongoose.model(" UserModule", userSchema)
    
     module.exports = {UserModule}