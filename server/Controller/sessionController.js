// controllers/trainingSessionController.js
const Session = require('../Models/SessionSchema');
const TrainingProgram = require("../Models/TrainingProgram");

// Controller function to create a new training session
exports.createTrainingSession = async (req, res) => {
  try {
    const { programId,programName, Startdatetime, Enddatetime, venue, trainee, trainers, status } = req.body;

    // Fetch the training program document using programId
    if(!programName || programName=='')
    {
      const trainingProgram = await TrainingProgram.findById(programId);
      if (!trainingProgram) {
        return res.status(404).json({ message: 'Training program not found' });
      }
      programName = trainingProgram.programName;
      console.log(programName);
    }
    
    
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

exports.createMultipleSession= async (req, res) => {
  try {
      const { formData, traineeIds } = req.body;

      // Iterate over the trainee IDs and create a session for each trainee
      const sessions = traineeIds.map(traineeId => ({
          programId: formData.programId,
          programName: formData.programName,
          Startdatetime: formData.Startdatetime,
          Enddatetime: formData.Enddatetime,
          venue: formData.venue,
          trainee: traineeId,
          trainers: formData.trainers, // Assuming trainers are the same for all sessions
          status: formData.status
      }));

      // Create sessions in the database
      const createdSessions = await Session.insertMany(sessions);
      res.status(201).json(createdSessions);
  } catch (error) {
      console.error("Error creating sessions:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};




