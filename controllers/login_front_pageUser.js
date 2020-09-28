const bcrypt = require("bcrypt");
const User = require("../database/models/User");

module.exports = async (req, res) => {
    const { email, password } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect("/posts")
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
