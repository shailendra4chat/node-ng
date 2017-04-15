var refresh = require('passport-oauth2-refresh')

module.exports = function (req, res, next) {
    var session = req.session
    var user = session.passport.user ? session.passport.user : null

    if (user && user.accessToken) {
        var dateNow = Date.now()
        var timeDifference = parseInt(dateNow, 10) - parseInt(session.passport.user.tokenCreatedAt, 10)

        if (timeDifference >= 150000) {
            refresh.requestNewAccessToken('uaa', user.refreshToken, function (err, accessToken, refreshToken) {
                session.redirectPath = req.originalUrl || '/'
                if (err) {
                    return res.redirect('/login')
                }
                session.passport.user.accessToken = accessToken
                session.passport.user.refreshToken = refreshToken
                session.passport.user.tokenCreatedAt = Date.now()
                next()
            })
        } else {
            session.redirectPath = ''
            next()
        }
    } else {
        res.redirect('/login')
    }
}