const db = require("../models");
const router = require("express").Router();

router.get("/workouts", (req, res) => {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  db.Workout.find({}).then((dbWorkout) => {
    res.json(dbWorkout);
  });
});

router.put("/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: req.body,
      },
    },
    {
      new: true,
    }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/workouts", (req, res) => {
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    });
});
module.exports = router;
