const Blog = require("../models/blogs.js");
const blog_index =	(req, res) =>{
    Blog.find().sort({createdAt: -1})
    .then((result) =>{
        res.render('index.ejs',{title:'Anasayfa',blogs: result})
    })
    .catch((err) => console.log(err))
}

const blog_content = (req, res) =>{
    const id = req.params.id
    
    Blog.findById(id)
    .then((result) =>{
        res.render('blog', {blog: result,title: 'detay '})
    })
    .catch((err) =>{
        res.status(404).render('404.ejs',{title: 'Not Found'})
    })
}

module.exports = {
	blog_index,
	blog_content
}