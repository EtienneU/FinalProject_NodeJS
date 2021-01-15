const { Student } = require('../models/db'); // Remplace let db = require('../models/db') et const Student = db.students;
const { getAge } = require('../services/students.services');
const erreurCall = require('../services/call.services');
// let StudentC = require('../models/student');
// let jwt = require("../services/auth.services");

// importer le service
// const studentsService = require('../services/students.services')

exports.getAll = async (req, res) => {
   // //recuperation du token du header
   // let token = req.headers['x-access-token'];

   // //verification de la validité du token
   // let verifytoken = jwt.verifyToken(token);

   // if (!verifytoken) {
   //    //si token n'est pas valide : utilisateur non authentifié
   //       res.status(401);
   //       res.json({ "message":" Accés interdit " });
   // } else {
   //    //si token est valide : utilisateur authentifié
   //    try {
   //       let resp = await Student.findAll();
       
   //       console.log(resp);

   //       let newResult = resp.map((result) => {
   //          let age = studentsService.getYears(result.dataValues.birthdate)
   //          console.log(age);
   //          console.log(result);
   //          //importer le service
   //          return new StudentC(result.dataValues.id, result.dataValues.first_name, result.dataValues.last_name, result.dataValues.birthdate, result.dataValues.bio, result.dataValues.class_name, age)
   //       });

   //       res.json(newResult);
   //    } catch (e) {
   //       res.json(500);
   //       res.json({ error: e });
   //    }
   // }

   try {
      let studentList = await Student.findAll();
      // console.log(resp);
      // Erreur métier : si mon tableau est vide
      if (studentList.empty) {
         var message = `La liste des étudiants est vide.`;
      } else {
         var message = `Liste des étudiants ---> `;
      }

      // Update de ma liste d'étudiants avec ajout de l'age
      studentList = studentList.map(etudiant => {
         etudiant.age = getAge(etudiant.birthdate);
         return etudiant;
      });

      // ici "resp" fait office de clé et de valeur (ce qu'attends res.json()). Idem pour message
      res.json({message : message + `${studentList.length} étudiant(s) en tout :`, studentList});
   } catch (erreur) {
      // J'envoie mon message d'erreur personnalisé à partir de mon module erreurCall (dans services)
      erreurCall(erreur, res);
   }
}

exports.getById = async (req, res) => {
   try {
      let student = await Student.findByPk(req.params.id); //findByPk retourne un seul élément ou null
      // si ma requete ne trouve pas l'étudiant dont l'id est passé en paramètre
      if (student === null) {
         const message =`L'étudiant demandé n'existe pas.`;
         res.status(400).json(message);
      }
      const message = `L'étudiant a été trouvé.`;
      // Update de ma liste d'étudiants avec ajout de l'age
      student.age = getAge(student.birthdate);
      res.json({message, student});
   } catch (e) {
      erreurCall(e, res)
   }
}


// exports.create = async (req, res) => {
//    if (req.body.first_name && req.body.last_name && req.body.birthdate && req.body.bio && req.body.class_name) {
//       try {
//          let rep = await Student.create(req.body)
//          res.json(rep);
//       } catch (e) {
//          res.status(500)
//          res.json({ "error": e });
//       }
//      } else {
//       res.status(400)
//       res.json({ 'message': 'bad request' });
//    }
// }

// exports.addLesson = async (req, resp) => {
//    try {
//       let student = await Student.findByPk(req.params.id2)
//       let lesson = await Lesson.findByPk(req.params.id1)
//       await lesson.setStudents(student);
//       let lessons = await student.getLessons();
//       resp.json(lessons);
     
//    } catch (e) {
//       console.log(e);
//       resp.status(500);
//       resp.json({ error: e });
//    }

  
// }

// exports.update = async (req, res) => {
//    try {
//        await Student.update(req.body, {
//          where: {
//             id: req.params.id
//          }
//       });
//         res.json({id:req.params.id,...req.body});
//    } catch (e) {
//       resp.json(500);
//       resp.json({ error: e });
//    }
// }

// exports.remove = async (req, resp) =>{
// try {
//        await Student.destroy({
//          where: {
//             id: req.params.id
//          }
//        });
//    res.status(200);
//         res.json({"message":"element removed"});
//    } catch (e) {
//       resp.json(500);
//       resp.json({ error: e });
//    }
// }
