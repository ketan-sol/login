const  User  = require('../models/User')


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email })
};

const getCurrentAmountById = async (id) => {
  return User.findById(id)
};

const getCurrentAmountByEmail = async (email) => {
  return User.findOne({ email })
};

module.exports = {
  getUserById,
  getUserByEmail,
  getCurrentAmountById,
  getCurrentAmountByEmail,
}