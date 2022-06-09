const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
// @route post api/posts
// @desc posts
// @access Pulic
router.post('/', async (req, res) => {
    const {title, description, url, status} = req.body
    console.log(title);
    if (!title)
        return res
            .status(400)
            .json({success: false, message: 'Title is required!!!'})
    
    try {
        const newPost = new Post({
            title, 
            description, 
            url: (url.startWith('https://')) ? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: '62a226d7ef1546d08537d9e3'
        })
        console.log("askgaucgaigci");
        await newPost.save()

        res.json({success: true, message: 'Happy learning', post: newPost})
    } catch (error) {
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