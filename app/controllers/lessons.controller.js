let db = require('../models/db');
const Lesson = db.lessons;
const lessonsService = require("../services/lessons.services");

// Recupération de toutes mes Lessons
// Je pars de l'hypothèse que les Lessons sont publiquement accessibles (pas de token requis pour getAll)
exports.getAll = async (req, res) => {
    try {
        let result = await Lesson.findAll();
        let newResult = result.map(element => lessonsService.checkFinished(element));
        res.json(newResult);
    }
    catch (e) {
        res.status(500)
        res.json({ "message": e });
    }
}

// Récupération de ma Lesson dont l'id est passé en paramètre
exports.getById = async (req, res) => {
    // vérification si l
    let id = req.params.id;
    if (id) {
        try {
            let result = await Lesson.findByPk(id); // la puissance de Sequelize
            let newResult = await lessonsService.checkFinished(result);
            res.json(newResult);
        
        } catch (e) {   
            res.status(500)
            res.json({ "Message": e });
        }
            
    } else {
            res.json({error: `Veuillez remplir les tous les champs neccessaires`});
    }
}

// Création d'une Lesson
exports.create = async (req, res) => {
    if (req.body.title && req.body.hours && req.body.teacher 
        && req.body.file_name && req.body.starting_date && req.body.ending_date) {

        try {
            let result = await Lesson.create(req.body);
            res.json(result);
        } catch (e) {
            res.status(500)
            res.json({'Error': e});
        }
         
    } else {
        res.status(400)
        res.json({error: `Veuillez remplir tous les champs neccessaires`});
    }
}

// Mise à jour d'une Lesson
exports.update = async (req, res) => {
    if (req.body.title && req.body.hours && req.body.teacher && req.body.file_name 
        && req.body.starting_date && req.body.ending_date && req.params.id) {
        try {
            await Lesson.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({ id: req.params.id, ...req.body });
            
        } catch (e) {
            res.json(500);
            res.json({error: e});
        }
               
    } else {
        res.status(400);
        res.json({error: 'bad request'});
    }
}

exports.remove = async (req, res) => {
    if (req.params.id) {
        try {
            await Lesson.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch (e) {
            res.status(500)
            res.json({ "message": e });
        }

    }
}