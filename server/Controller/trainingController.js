// controllers/trainingProgramController.js

const TrainingProgram = require('../Models/TrainingProgram');
const CoeSchema = require('../Models/CoeSchema');

// Controller function to create a new training program
exports.createTrainingProgram = async (req, res) => {
    try {
        const { programName, description, createdBy, coes } = req.body;

        // Create a new training program 

        const savedTrainingProgram = await TrainingProgram.create({
            programName,
            description,
            createdBy,
            coes
        });

        res.status(201).json(savedTrainingProgram);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to create a new COE
exports.createCOE = async (req, res) => {
    try {
        const { coeName, description, programs } = req.body;

        // Create a new COE document
        const savedCOE = await CoeSchema.create({
            coeName,
            description,
            programs
        });

        res.status(201).json(savedCOE);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
