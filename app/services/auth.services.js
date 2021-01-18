const jwt = require('jsonwebtoken');
const privateKey = require('../config/privatekey');
const { User } = require('../models/db');

module.exports = async (req, res, next) => {
    console.log(`Requete pour page protégée`);
    const token = req.headers["x-access-token"];

    // controle : token fourni ?
    if (!token) {
        const message = `Token non fourni. Fournir un token`;
        return res.status(401).json({message});
    }
    
    // controle : le token est bon ? 
    jwt.verify(
        token, 
        privateKey.privateKey,
        async (error, decodedToken) => {
            if (error) {
                const message = `vous n'êtes pas autorisé à accéder à cette page`;
                return res.status(401).json({message, data: error.message});
            }
            console.log(`decodedToken : `, decodedToken);
            const userId = decodedToken.userId; // chiffrage de ma clé userId créé dans user .login
            const userFromToken = await User.findByPk(userId); //récupération du user lié au token

            // si le compte de l'utilisateur a été supprimé
            if (!userFromToken) {
                const message = `Compte inexistant. Vous n'êtes pas autorisé à accéder à cette page`;
                return res.status(401).json({message});
            }

            // ici, toutes les vérifications sont ok
            // je vais avoir besoin de l'id pendant la durée de vie de ma requete :
            res.locals.id = userId; // j'ajoute la propriété id à notre variable locale 'locals' de ma requête.
            next();
        }
    );
}

// // verifie si le token est validé
// exports.verifyToken = (token) => {
//     console.log('verify '+token);
//     if (!token) {
//         return false;
//     }
//     return jwt.verify(token, config.secret, (err, response) => {
//         if (err) {
//             return false;
//         }
//         return response.id;
//     })
// }

// // genere le token
// exports.signToken = (id) => {
//     let token = jwt.sign({ id: id }, config.secret, { expiresIn: 3600 });
//     return token;
// }