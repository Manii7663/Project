const AssessmentScore = require('../Models/AssesmentScore');
const TrainingSession = require('../Models/SessionSchema'); // Assuming you have a TrainingSession model

exports.createAssessmentScore = async (req, res) => {
    try {
        let { assessmentSessionId, userId, assessmentDate, maxScore, score, sessionName } = req.body;

        // If sessionName is not provided, fetch it from the TrainingSession database using the assessmentSessionId
        if (!sessionName) {
            const Session = await TrainingSession.findById(assessmentSessionId);
            if (!Session) {
                return res.status(404).json({ message: 'TrainingSession not found' });
            }
            sessionName = Session.programName; // Assuming TrainingSession has a property programName
            Session.status = 'completed'; // Update the session status to "completed"
            await Session.save();
        }

        

        const newAssessmentScore = await AssessmentScore.create({
            assessmentSessionId,
            userId,
            assessmentDate,
            maxScore,
            score,
            sessionName
        });

        res.status(201).json(newAssessmentScore);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAssessmentScores = async (req, res) => {
    try {
        const assessmentScores = await AssessmentScore.find();
        res.status(200).json(assessmentScores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};