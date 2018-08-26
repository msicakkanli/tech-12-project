function loggedOut(req,res,next) {
    if(req.session && req.session.userId) {
        return res.direct('/home');
    }
    return next();
}

function requiresLogin(req,res,next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You have to login')
        err.status = 401;
        return next(err);
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;