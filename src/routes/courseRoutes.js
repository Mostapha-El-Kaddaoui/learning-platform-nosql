const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes pour les cours
router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);
router.get("/stats", courseController.getCoursesStats);
router.get("/api/courses", (req, res) => {
  res.json([{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }]);
});

module.exports = router;
