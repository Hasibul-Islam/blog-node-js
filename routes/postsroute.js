
//Express calling
const mongoose = require('mongoose',{ useUnifiedTopology: true })
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
const verify = require('../routes/verifytoken')
const express = require('express')
const upload = require('../middlewares/upload')
//Router calling
const router = express.Router()
//Post model calling
const Post = require('../models/PostsModel')
const User = require('../models/UsersModel')
//Gets all the posts
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    }
    catch (err) {
        res.json({
            message: err
        })
    }
})

//Specific Post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch (err) {
        res.json({
            message: err
        })
    }

})

//Delete Post

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({
            _id: req.params.postId
        })
        res.json(removedPost)
    }
    catch (err) {
        res.json({
            message: err
        })
    }
})

//Posting Data
router.post('/new-post',upload.single('image'), async (req, res) => {
    var token = req.header('auth_token')
    user = jwt.decode(token,process.env.TOKEN_SECRET)
    console.log(user._id)
    userName = await User.findOne({_id: user._id}).exec()
    const post = new Post({
        title: req.body.title,
        author: userName.name,
        description: req.body.description
    })
    if(req.file){
        post.img = req.file.path
    }

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    }
    catch (err) {
        res.json({
            message: err
        })
    }
})

// Update Data
router.patch('/:postId', async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        const updatedPost = await Post.updateOne(
        {
            _id: req.params.postId
        },
        { 
            $set : {title: req.body.title}
        })

        res.json(updatedPost)

    }
    catch (err) {
        console.log(err);
        res.json({
            message: err
        })
    }
})


//non-async way
// post.save()
// .then(data=>{
//     res.json(data)
// })
// .catch(err=>{
//     res.json({
//         message: err
//     })
// })


module.exports = router