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
 *     description: Fetches all reports with images, reporter info, and status.
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
 *                         example: "67a12bc3456def7890abcd12"
 *                       title:
 *                         type: string
 *                         example: "Broken Pipe in Hostel A"
 *                       description:
 *                         type: string
 *                         example: "Water is leaking from the wall near room 204."
 *                       category:
 *                         type: string
 *                         example: "Plumbing"
 *                       location:
 *                         type: string
 *                         example: "Hostel A - Block B"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             publicId:
 *                               type: string
 *                               example: "fixit/abc123xyz"
 *                             url:
 *                               type: string
 *                               example: "https://res.cloudinary.com/demo/image/upload/v1234567/fixit/abc123xyz.jpg"
 *                       status:
 *                         type: string
 *                         enum: [pending, in-progress, resolved]
 *                         example: "pending"
 *                       reportedBy:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ca"
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "60d0fe4f5311236168a100aa"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-20T10:32:15.123Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-20T10:32:15.123Z"
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
