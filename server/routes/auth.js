const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// router.get('/', (req, res) => res.send('User Route'))
// @route post api/auth/register
// @desc Register user
// @access Pulic
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    if (!username || !password)
        return res
            .status(400)
            .json({
                success: false, 
                message: 'Missing username or password'
            })
    try { 
        const user = await User.findOne({username})

        if (user)
            return res
                .status(400)
                .json({
                    success: false, 
                    message: 'Username alrealy taken'
                })

        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        // return token
        const accessToken = jwt.sign(
            {userId: newUser._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )
        
        res.json({
            success: true,
            message: 'User created sucessfully!!!',
            accessToken
        })
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

// @route post api/auth/login
// @desc Login user
// @access Pulic
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if (!username || !password)
        return res
            .status(400)
            .json({
                success: false, 
                message: 'Missing username or password'
            })
    
    try {
        const user = await User.findOne({ username })
        
        if (!user) 
            return res
                .status(400)
                .json({
                    success: false, 
                    message: 'Incorrect username'
                })
        
        // username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res
                .status(400)
                .json({
                    success: false, 
                    message: 'Incorrect password'
                })

        // return token
        const accessToken = jwt.sign(
            {userId: user._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'Logged in sucessfully!!!',
            accessToken
        })
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