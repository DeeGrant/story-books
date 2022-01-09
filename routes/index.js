const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    try {
        Story.find({ user: req.user.id}).exec().then(data => {
        res.render('dashboard', {
            name: req.user.firstName,
            stories: data,
        })

        })
    } catch (e) {
        console.log(e)
        res.render('error/500')
    }

})

module.exports = router