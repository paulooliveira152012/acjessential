const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // 10 is a common value for the salt rounds
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword; // Return the hashed password
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err; // Rethrow the error for further handling if needed
  }
};

// Example usage
hashPassword("acj2024@");