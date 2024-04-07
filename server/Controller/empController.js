const User = require('../Models/UserSchema');

exports.getEmployeeIds = async (req, res) => {
  try {
    const employees = await User.find({ role: 'Employee' }, '_id');
    const employeeIds = employees.map(employee => employee._id);
    res.json({ employeeIds });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
