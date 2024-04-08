// controllers/trainingSessionController.js
const Session = require('../Models/SessionSchema');
const TrainingProgram = require("../Models/TrainingProgram");

// Controller function to create a new training session
exports.createTrainingSession = async (req, res) => {
  try {
    const { programId, Startdatetime, Enddatetime, venue, trainee, trainers, status,batch } = req.body;

    // Fetch the training program document using programId
    const trainingProgram = await TrainingProgram.findById(programId);

    if (!trainingProgram) {
      return res.status(404).json({ message: 'Training program not found' });
    }

    // Extract the programName
    const programName = trainingProgram.programName;
    console.log(programName);

    // Create a new training session document
    const newTrainingSession = await Session.create({
      programId,
      programName, // Include the programName here
      Startdatetime,
      Enddatetime,
      venue,
      trainee,
      trainers,
      status,
    });

    res.status(201).json(newTrainingSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.getTrainingSession = async (req, res) => {
  try {
    // Retrieve all training programs from the database
    const trainingSession = await Session.find();

    res.status(200).json(trainingSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



