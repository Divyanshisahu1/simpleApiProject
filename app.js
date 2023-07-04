const express = require("express")
const { UserModule } = require("./model/connection")
const app = express()
const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register', async (req, res) => {
    try {
        console.log("register req body", req.body);
        //validation
        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(req.body.email)) {
            return res.status(400).send({ status: 'error', message: 'invalid email address provided' })
        }
        else {
            const user = new UserModule(req.body);
            console.log("user", user)
            await user.save();

            res.send({
                "status": 200,
                "msg": "user is registered",
                "data": user
            })
        }

    } catch (error) {
        console.log("error", error.message);
        res.send({
            status: 400,
            "msg": error.message
        })
    }
})

app.post("/login", async (req, res) => {
    try {
        let msg = "User is Logged in";
        let status = 200;
        const { email, password } = req.body;
        console.log("userEmail", email)
        let user = await UserModule.findOne({ email: email })
        console.log("user", user)
        if (user) {

            if (user.password === password) {
                console.log("User Exists")
            }
            else {
                console.log("password is incorrect")
                msg = "password is Incorrect! Please enter the correct password "
                status = 400;
            }
        }
        else {
            console.log("User does not exist!Please Signup")
            msg = "User does not exist!Please Signup";
            status = 400;
        }
        res.json({
            status: status,
            msg: msg
        })

    } catch (error) {
        console.log("error", error.message);
        res.send({
            "status": 400,
            "msg": error.message
        })
    }
})

app.get("/profile", async (req, res) => {
    try {

        const loggedInUsers = await UserModule.find({});
        console.log("loggedinUsers", loggedInUsers)
        res.json(loggedInUsers)

    } catch (error) {
        console.log("error", error.message);
        res.send({
            status: 400,
            msg: error.message
        })

    }
})

const port = 8000

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})
