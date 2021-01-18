const { User } = require('../models/db');
const erreurCall = require('./call.services');

// fonction asynchrone. Si l'e-mail existe déjà, on retourne true, sinon false
checkDuplicateEmail = async (req, res) => {
    try {
        const user = await User.findOne({  // on attend la promesse retournée par findOne
            where: {email: req.body.email}
        });
        if (user) {
            res.status(400).json({message : `E-mail déja utilisé.`});
            return true;
        } else {
            return false;
        }
    } catch (error) {
        erreurCall(error, res);
    }
}

module.exports = {
    checkDuplicateEmail
  };