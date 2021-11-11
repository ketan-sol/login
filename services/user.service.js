const  User  = require('../models/User')


const getUserById = async (id) => {
  return User.findById(id)
}


module.exports = { getUserById }