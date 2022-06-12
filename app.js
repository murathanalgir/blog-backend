//Consts
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { response } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')

//routes
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')



// ?
require('dotenv').config()
const app = express();
const dbURL = 'mongodb://localhost:';
mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
.then((result) => console.log('db ok'))
.catch((err) => console.log(err))


app.set('view engine', 'ejs')

app.listen(3001, ()=>{
    console.log('App ok')
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())


app.get('*',checkUser)
app.get('/', (req, res) =>{
    res.redirect('/blog')
})


app.use('/',authRoutes)
app.use('/blog',blogRoutes)
app.use('/admin',requireAuth,adminRoutes)


app.get('/about', (req, res) =>{
    res.render('about',{title: 'Blog'})
})


 app.use((req, res) => {
     res.status(404).render('404.ejs',{title: 'Sayfa yok'})
 })