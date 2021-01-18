const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/db');
const erreurCall = require('../services/call.services');
const privateKey = require('../config/privatekey');
const { checkDuplicateEmail } = require('../services/user.services');

exports.login = async (req, res, userRegister = null, messageRegister = null) => {
    // Si j'ai tous les éléments nécessaires (email et pwd)
    if (req.body.email && req.body.password) {
        try {
            let user; // notre variable user peut être affecté de deux manières
            // Appel API sur /login = mon userRegister n'existe pas => login habituel 
            if (userRegister != "object") {
                // récupérer le user avec la fonction findOne de Sequelize et le parametre 'email'
                user = await User.findOne({ where: { email: req.body.email } });
                // si user == undefined
                if (!user) {
                    return res.status(404).json({ "message": "Aucun utilisateur n'existe avec ces identifiants." });
                }
                // On compare nos mots de passe
                const verifyPassword = bcrypt.compareSync(req.body.password, user.password); // retourne true ou false
                if (!verifyPassword) {
                    const message = `Mot de passe incorrect.`;
                    return res.status(401).json({ message });
                } 
            } else { // Appel API sur /register = mon userRegister n'existe pas => login habituel 
                user = userRegister;
            }

            // ok : on retourne le user et le token associé à sa connexion
            const token = jwt.sign({userId : user.id}, privateKey.privateKey, {expiresIn : '12h'});
            // let student = await user.getStudent() // si l'association User-Student existe
            const message = (typeof messageRegister === "string") ? messageRegister : `Identification réussie - Récupérer le token pour vos futures requetes sur l'API`;
            res.json({ message, data: user, token});
            
        } catch (e) {
            // erreur système, j'appelle ma fonction erreurCall
            erreurCall(e, res);
        }
    } else {
        // Erreur métier : il manque l'email ou le pwd
        res.status(400).json(`Connexion echouée - Renseigner votre e-mail et votre mot de passe.`)
    }
}

// Inscription d'un user (teacher ou student)
exports.register = async (req, res) => {
    // type = 1 pour teacher, type = 2 pour student
    if (req.body.email && req.body.password && req.body.type) {
        try {
            const emailUsed = await checkDuplicateEmail(req, res);
            // const user = await User.findOne({ where: { email: req.body.email } });
            if (!emailUsed) {
                const user = await User.create({
                    email: req.body.email,
                    type: req.body.type,
                    password: bcrypt.hashSync(req.body.password, 8)
                });
                // redirection automatique à l'authentification (login)
                this.login(req, res, user, `Compte créé. Authentifiaction réalisée automatiquement`);
            } else {
                res.status(409);
                res.json({ "message": 'Cet email est déja utilisé.' })
            }
        } catch (e) {
            // ma fonction qui gère les erreurs système
            erreurCall(e, res);
        }
    } else {
        const message = `Inscription echouée - Renseigner votre e-mail, votre mot de passe et votre type de profil.`;
        res.status(400).json({message});
    }
}

