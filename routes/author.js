const express = require("express")
const router = express.Router()
const Author = require('../models/author')

//author route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != "" && req.query.name != null)
    {
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render("author/index",{authors:authors,searchOptions:req.query})
    } catch (error) {
        res.redirect("/")
    }
    res.render("author/index")
})

//new author route
router.get('/new',(req,res) => {
    res.render('author/new',{author:new Author()})
})


//create author route
router.post('/', async (req,res) => {
    const author = new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect("authors")
    } catch (error) {
        res.render('author/new',{author:author,errorMessage:"error creating author"})
    }
  
})

module.exports = router