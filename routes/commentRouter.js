const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

//--------------------
//public access
//--------------------

//get comments listed by report id
//router.get('/:id', getComments)

//--------------------
//protected access
//--------------------

//create comment
//router.post('/', auth, createComment)

//delete comment
//router.delete('/:id', auth, deleteComment)
