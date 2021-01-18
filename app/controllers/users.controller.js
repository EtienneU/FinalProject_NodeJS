const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/db');
const erreurCall = require('../services/call.services');
const privateKey = require('../config/privatekey');

exports.login = async (req, res) => {
    // Si j'ai tous les éléments nécessaires (email et pwd)
    if (req.body.email && req.body.password) {
        try {
            // récupérer le user avec le parametre email
            const user = await User.findOne({ where: { email: req.body.email } });
            // si user == undefined
            if (!user) {
                return res.status(404).res.json({ "message": "Aucun utilisateur n'existe avec ces identifiants." });
            }
            // On compare nos mots de passe
            const verifyPassword = bcrypt.compareSync(req.body.password, user.password); // retourne true ou false
            if (!verifyPassword) {
                const message = `Mot de passe incorrect.`;
                res.status(401).json({ message });
            } else { // ok : on retourne le user en ajoutant le token associé à sa connexion
                const token = jwt.sign({userId : user.id}, privateKey.privateKey, {expiresIn : '12h'});
                // let student = await user.getStudent() // si l'association User-Student existe
                const message = `Identification réussie - Récupérer le token pour vos futures requetes sur l'API`;
                res.json({ message, data: user, token});
            }

        } catch (e) {
            // erreur système
            erreurCall(e, res);
        }
    } else {
        // Erreur métier : il manque l'email ou le pwd
        res.status(400).json(`Connexion echouée - Renseigner votre e-mail et votre mot de passe.`)
    }
}

exports.register = async (req, res) => {

    try {

        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {

            let result = await User.create(req.body);
            res.json(result);
            
        } else {
            res.status(409);
            res.json({ "message": 'Cet email est déja utilisé' })
        }

       


    } catch (e) {
        res.status(500);
            res.json({ "message": e })
    }
   
}

