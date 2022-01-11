const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc   Show add page
// @route  GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// @desc   Process add form
// @route  POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (e) {
        console.error(e)
        res.render('error/500')
    }
    res.render('stories/add')
})

// @desc   Show all stories
// @route  GET /stories
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
            .exec()

            res.render('stories/index', {stories})
    } catch (e) {
        console.error(e)
        res.render('error/500')
    }
})

// @desc   Show single story
// @route  GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id)
            .populate('user')
            .lean().exec()
        if (!story) {
            res.render('error/404')
        } else {
            res.render('stories/show', {story})
        }
    } catch (e) {
        console.error(e)
        res.render('error/404')
    }
})

// @desc   Show edit page
// @route  GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({_id: req.params.id}).lean().exec()
        if (!story) {
            res.render('error/404')
        }
        if (story.user != req.user.id) { // comparing Symbols
            res.render('stories')
        } else {
            res.render('stories/edit', {story})
        }
    } catch (e) {
        console.error(e)
        res.render('error/500')
    }
})

// @desc   Update story
// @route  PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean().exec()
        if (!story) {
            res.render('error/404')
        }
        if (story.user != req.user.id) { // comparing Symbols
            res.render('stories')
        } else {
            story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            res.redirect('/dashboard')
        }
    } catch (e) {
        console.error(e)
        res.render('error/500')
    }
})

// @desc   Delete story
// @route  DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id).lean().exec()
        res.redirect('/dashboard')
    } catch (e) {
        console.error(e)
        res.render('error/500')
    }
})

module.exports = router