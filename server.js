const dotenv = require("dotenv")

const express = require("express")
const app = express()
dotenv.config()

const expressLayouts = require("express-ejs-layouts")

const indexRoutes = require("./routes/index")

app.set('view engine','ejs')
app.set('views', __dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//connecting to database
 var mongo_uri = process.env.DATABASE_URL

const mongoose = require("mongoose")
mongoose.connect(mongo_uri, () => {
    console.log("connected to db")
})


//database close

app.use('/',indexRoutes)

app.listen(process.env.PORT || 3000)