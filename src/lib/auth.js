const isLoggedIn = (req, res, next)=> {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }

const auth = (Permissions) => { //
    
    return (req, res, next) => {
        const usu = req.user.name;
        
        if (Permissions.includes(usu)){
            next();
        }
        else {
            res.redirect('/profile')
            }
    }
}
module.exports = { isLoggedIn, auth }
