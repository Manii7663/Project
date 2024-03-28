const User = require('../Models/UserSchema'); // Import the User model/schema

/** Update password in the database */
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        // Update the user's password
        user.password = newPassword;

        // Save the updated user object
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error: "An error occurred while changing the password." });
    }
};
