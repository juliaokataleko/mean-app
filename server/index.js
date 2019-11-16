const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')

app.use(session({
    secret: 'ffsgdhfasfaioadasdnafaudadjajwjw425jfjesf',
    saveUnintialized: false,
    resave: false
}))

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/angulardb')
.then(() => console.log('Mongoose up..'))

const User = require('./models/users')

app.use(bodyParser.json())

app.post('/api/register',  async (req, res) => {
    //console.log(req.body)
    const {email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser) {
        res.json({
            success: false,
            message: "This user already exists..."
        })

        return
    }

    const user = new User({
        email, password
    })

    const result = await user.save()
    res.json({
        success: true,
        message: "Weel come man..."
    })
    req.session.user = email
    req.session.save()
    // store data in database...
})

app.post('/api/login',  async (req, res) => {
    const {email, password} = req.body;
    //console.log(email, password)
    const resp = await User.findOne({email, password})
    if(!resp) {
        //console.log("Credenciais errados...")
        res.json({
            success: false,
            message: "Incorrect details..."
        })
    } else {
        //console.log("User loggedIn...")
        res.json({
            success: true,
            message: "Weel come man..."
        })
        req.session.user = email
        req.session.save()
        console.log("You loggedIn")
    }
    //res.send("k")
})

app.get('/api/isloggedin', (req, res) => {
    res.json({
        status: !!req.session.user
    })
})

app.get('/api/data', async (req, res) => {
    const user = await User.findOne({email: req.session.user})
    if(!user) {
        res.json({
            status: false,
            message: "User not found or deleted.."
        })
        return
    }
    res.json({
        status: true,
        email: req.session.user,
        quote: user.quote
    })
})

app.get('/api/logout', (req, res) => {
    req.session.user = undefined;
    //req.session.destroy();
    req.session.save();
    res.json({
        success: true
    })
})

app.post('/api/quote', async(req, res) => {
    console.log(req.session.user, req.body.value)
    const user = await User.findOne({email: req.session.user})
    if(!user) {
        res.json({
            success: false,
            message: "User not found or deleted.."
        })
        return
    }
    await User.update({email: req.session.user}, {$set: { quote: req.body.value }})
    res.json({
        success: true
    })
})

app.listen(1234, () => console.log('Server listening at 1234'))