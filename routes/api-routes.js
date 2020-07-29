const db = require("../models");

module.exports = (app) => {
  app.get("/workouts", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Workout.find({}).then((dbWorkout) => {
      res.json(dbWorkout);
    });
  });

  app.put("/workouts/:id", ({ params, body }, res) => {
    console.log(body);
    db.Workout.findByIdAndUpdate(
      params.id,
      {
        $push: {
          exercises: body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/workouts", (req, res) => {
    db.Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/workouts/range", (req, res) => {
    db.Workout.find({})
      .limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      });
  });
};
