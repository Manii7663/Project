// controllers/trainingProgramController.js

const TrainingProgram = require("../Models/TrainingProgram");
const CoeSchema = require("../Models/CoeSchema");

// Controller function to create a new training program
exports.createTrainingProgram = async (req, res) => {
  try {
    const { programId, programName, description, createdBy,creationDate, coe,trainerId } = req.body;

    // Create a new training program

    const savedTrainingProgram = await TrainingProgram.create({
      programId,
      programName,
      description,
      createdBy,
      creationDate,
      coe,
      trainerId
    });

    res.status(201).json(savedTrainingProgram);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getTrainingPrograms = async (req, res) => {
  try {
    // Check if COE ID is provided in the request parameters
    const { coeId } = req.params;
    let trainingPrograms;

    // If COE ID is provided, fetch training programs filtered by COE ID
    if (coeId != 'undefined') {
      console.log("coe found")
      trainingPrograms = await TrainingProgram.find({ coe: coeId });
    } else {
      // If COE ID is not provided, fetch all training programs
      console.log("coe not found")
      trainingPrograms = await TrainingProgram.find();
    }

    res.status(200).json(trainingPrograms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Controller function to create a new COE
exports.createCOE = async (req, res) => {
  try {
    const { coeName, description, coeHead } = req.body;

    // Create a new COE document
    const savedCOE = await CoeSchema.create({
      coeName,
      description,
      coeHead,
    });

    res.status(201).json(savedCOE);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCOE = async (req, res) => {
  try {
    // Retrieve all COE documents from the database
    const coes = await CoeSchema.find();

    res.status(200).json(coes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

