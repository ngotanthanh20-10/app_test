const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const Post = require('../models/Post')

// @route GET api/posts
// @desc GET posts
// @access private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, posts})
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error',
            })
    }
})

// @route post api/posts
// @desc posts
// @access private
router.post('/', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body

    if (!title)
        return res
            .status(400)
            .json({success: false, message: 'Title is required!!!'})
    
    try {

        const newPost = new Post({
            title, 
            description, 
            url: (url.startsWith('https://')) ? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: '62a226d7ef1546d08537d9e3'
        })
        await newPost.save()

        res.json({success: true, message: 'Happy learning', post: newPost})

    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error',
            })
    }
})

// @route PUT api/posts
// @desc Update posts
// @access private
router.put('/:id', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body

    if (!title)
        return res
            .status(400)
            .json({success: false, message: 'Title is required!!!'})
    
    try {
        updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        // user not Authorization to update post not found
        if(!updatedPost) {
            return res
                .status(401)
                .json({success: false, message: 'Post update not found'})
        }

        res.json({success: true, message: 'Excellent process!!!', post: updatedPost})
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error',
            })
    }
})

// @route PUT api/posts
// @desc Update posts
// @access private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(
            req.params.id,    
        )

        if(!deletePost) {
            return res
                .status(401)
                .json({success: false, message: 'Post delete not found'})
        }
        
        res.json({success: true, message: 'Deleted post sucessfully!!!', post: deletePost})
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error',
            })
    }

})

module.exports = router