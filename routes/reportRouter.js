const multer = require("multer");
const express = require("express");
const router = express.Router();
const {
  createReport,
  //   getUserReport,
  //   getReportById,
  //   getAllReports,
  //   deleteReport,
  //   updateReport,
} = require("../controllers/reportController");

const upload = multer({ storage: multer.memoryStorage() });

//--------------------
//public access
//--------------------

//create a report
router.post("/create", upload.array("images", 5), createReport);

//get user reports
//router.get('/user', auth, getUserReport)

//get report by id
//router.get('/:id', auth, getReportById)

//get all reports
//router.get('/', getAllReports)

//--------------------
//admin access
//--------------------

//update report status
//router.put('/:id', auth, authorize('admin'), updateReport)

//delete report by id
//router.delete('/:id', auth, authorize("admin"), deleteReport)

module.exports = router;
