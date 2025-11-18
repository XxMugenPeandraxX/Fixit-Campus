const express = require('express')
const router = express.Router()
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController')

//--------------------
//public access
//--------------------

//get all category
//router.get('/', getAllCategories)

//----------------------
//admin access
//----------------------

//create category
//router.post('/create', auth, authorize('admin'), createCategory)

//update category
//router.put('/:id', auth, authorize('admin'), updateCategory)

//delete category
//router.delete('/:id', auth, authorize('admin'), deleteCategory)