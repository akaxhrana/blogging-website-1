const User = require("../database/models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { email, password } = req.body;
    
    // try to find the user
    User.findOne({
        email,
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    const uname = user.username;
                    
                    return res.redirect("/create")
                }
                else {
                    res.redirect("/")
                }
            })
        } else {
            return res.redirect("/");
        }
    })
}
