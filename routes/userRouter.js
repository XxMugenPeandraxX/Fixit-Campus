const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

//--------------------
//public access
//--------------------

//get user
//router.get('/me', auth, getUser)

//--------------------
//admin access
//--------------------

//get all users
//router.get('/', auth,authorize('admin'), getAllUsers)

//delete user
//router.delete('/:id', auth, authorize('admin'), deleteUser)
