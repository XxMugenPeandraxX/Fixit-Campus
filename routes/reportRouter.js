const multer = require("multer");
const express = require("express");
const router = express.Router();
const {
  createReport,
  //   getUserReport,
  //   getReportById,
  getAllReports,
  //   deleteReport,
  //   updateReport,
} = require("../controllers/reportController");

const upload = multer({ storage: multer.memoryStorage() });

//--------------------
//public access
//--------------------

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Infrastructure repair reports
 */

/**
 * @swagger
 * /api/report/create:
 *   post:
 *     summary: Create a new infrastructure repair report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - location
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: Broken classroom window
 *               description:
 *                 type: string
 *                 example: Glass shattered and falling.
 *               category:
 *                 type: string
 *                 example: structural
 *               location:
 *                 type: string
 *                 example: Faculty of Engineering, Block A
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 5 images
 *     responses:
 *       201:
 *         description: Report created successfully
 *       400:
 *         description: Missing fields or images
 *       500:
 *         description: Server error
 */

router.post("/create", upload.array("images", 5), createReport);

//get user reports
//router.get('/user', auth, getUserReport)

//get report by id
//router.get('/:id', auth, getReportById)

/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: Retrieve all reports
 *     description: Fetches a list of all reports from the database.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ca"
 *                       title:
 *                         type: string
 *                         example: "Monthly Sales"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching reports"
 *                 error:
 *                   type: string
 */

router.get("/", getAllReports);

//--------------------
//admin access
//--------------------

//update report status
//router.put('/:id', auth, authorize('admin'), updateReport)

//delete report by id
//router.delete('/:id', auth, authorize("admin"), deleteReport)

module.exports = router;
