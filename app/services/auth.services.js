const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


// verifie si le token est validé
exports.verifyToken = (token) => {
    console.log('verify '+token);
    if (!token) {
        return false;
    }
    return jwt.verify(token, config.secret, (err, response) => {
        if (err) {
            return false;
        }
        return response.id;
    })
}


// genere le token
exports.signToken = (id) => {
    let token = jwt.sign({ id: id }, config.secret, { expiresIn: 3600 });
    return token;
}