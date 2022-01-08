function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/')
    }
}

function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/dashboard')
    }
}

module.exports = {
    ensureAuth,
    ensureGuest,
}