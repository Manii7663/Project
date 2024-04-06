// controllers/trainingSessionController.js

const Session = require('../Models/SessionSchema');

// Controller function to create a new training session
exports.createTrainingSession = async (req, res) => {
  try {
    const { programId, Startdatetime, Enddatetime, venue, trainees,trainers,status} = req.body;
    
    // Create a new training session document
    const newTrainingSession = await Session.create({
      programId,
      Startdatetime,
      Enddatetime,
      venue,
      trainees,
      trainers,
      status
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



const AssessmentScore = require('../Models/AssesmentScore');

exports.createAssessmentScore = async (req, res) => {
    try {
        const { assessmentSessionId, internId, assessmentDate, totalScore } = req.body;

        const newAssessmentScore = await AssessmentScore.create({
            assessmentSessionId,
            internId,
            assessmentDate,
            totalScore
        });

        res.status(201).json(newAssessmentScore);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
