const Batch = require('../Models/BatchSchema');

// Controller function to create a new batch
exports.newBatch = async (req, res) => {
  try {
    const { batchId, batchName, startDate, endDate, description } = req.body;
    
    // Create a new batch document
    const newBatch = await Batch.create({ batchId, batchName, startDate, endDate, description });
    
    res.status(201).json({ message: 'Batch created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
