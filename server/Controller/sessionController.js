// controllers/trainingSessionController.js

const Session = require('../Models/SessionSchema');

// Controller function to create a new training session
exports.createTrainingSession = async (req, res) => {
  try {
    const { programId, date, time, location, coe, trainees } = req.body;
    
    // Create a new training session document
    const newTrainingSession = await Session.create({
      programId,
      date,
      time,
      location,
      coe,
      trainees
    });


    res.status(201).json(newTrainingSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
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
