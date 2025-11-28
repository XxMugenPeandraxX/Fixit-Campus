const Report = require("../models/Report");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");
const mongoose = require("mongoose");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "fixit-reports",
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  });
};

exports.createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Ensure images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    // Upload each image buffer to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer);
      imageUrls.push(url);
    }

    const report = await Report.create({
      title,
      description,
      category,
      location,
      images: imageUrls,
      //user: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Create Report Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the report",
      error: error.message,
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("Fetch all Reports Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching all reports",
      error: error.message,
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "invalid report ID",
      });
    }

    if (status === undefined || status === null) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowed = {
      0: "pending",
      1: "in-progress",
      2: "resolved",
    };

    const newStatus = allowed[status];
    if (!newStatus) {
      return res.status(400).json({
        success: false,
        message: "invalid status recieved",
      });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const transition = {
      pending: ["in-progress"],
      "in-progress": ["resolved"],
      resolved: [],
    };

    const current = report.status;

    if (!transition[current].includes(newStatus)) {
      return res.status(409).json({
        success: false,
        message: `Cannot move from ${current} to ${newStatus}`,
      });
    }

    report.status = newStatus;
    await report.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      report,
    });
  } catch (error) {
    console.log("An error occured while updating report status: \n", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating report",
      error: error.message,
    });
  }
};
