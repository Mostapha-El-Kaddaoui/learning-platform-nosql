const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  try {
    const course = req.body;
    const result = await mongoService.insertOne("courses", course);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `course:${id}`;

    const cachedCourse = await redisService.getCacheData(cacheKey);
    if (cachedCourse) return res.json(cachedCourse);

    const realCourse = await mongoService.findOneById("courses", id);
    if (realCourse) {
      await redisService.cacheData(cacheKey, realCourse);
      return res.json(realCourse);
    }
    return res.status(404).json({ error: "Course not found" });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to get course' });
  }
}

async function getCourses(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `courses:${id}`;

    const cachedCourses = await redisService.getCacheData(cacheKey);
    
    if (cachedCourses) return res.json(cachedCourses);

    const realCourses = await mongoService.findMany("courses");
    if (realCourses) {
      await redisService.cacheData(cacheKey, realCourses, 100);
      return res.json(realCourses);
    }
    return res.status(404).json({ error: "Course not found" });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to get course' });
  }
}

async function getCoursesStats(req, res) {
  const cachedKey = 'course:stats';
  const cachedStats = await redisService.getCacheData(cachedKey);
  try {
    if (cachedStats)
      return res.json(cachedStats)
  
    const courses = await mongoService.findMany('courses');
    const status = {
      total: courses.length,
    }
  
    await redisService.cacheData(cachedKey, status);
    return res.json(status)
  } catch (error) {
    console.error('Get course stats error:', error);
    res.status(500).json({ error: 'Failed to get course stats' });
  }

}

module.exports = {
  createCourse,
  getCourse,
  getCourses,
  getCoursesStats
};
