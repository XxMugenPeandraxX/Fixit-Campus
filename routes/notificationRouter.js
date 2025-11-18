const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  getUserNotification,
  getReportNotification,
  createNotification,
  deleteNotification,
} = require("../controllers/notificationController");

//--------------------
//public access
//--------------------

//get all notification
//router.get('/', getAllNotifications)

//get user notification
//router.get("/user", auth, getUserNotification)

//get report notification
//router.get('/report/:id', auth, getReportNotification)

//--------------------
//admin access
//--------------------

//create notification

//delete notification
//router.delete('/:id', auth, authorize('admin'), deleteNotification)
