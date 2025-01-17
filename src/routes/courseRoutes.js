// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour améliorer l'organisation, la lisibilité, et la maintenance du code en regroupant les routes par fonctionnalité.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En les regroupant par domaine dans des fichiers dédiés au sein d'un dossier spécifique, comme /routes.
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes pour les cours
router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);
router.get("/stats", courseController.getCoursesStats);

module.exports = router;
