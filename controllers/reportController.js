const Report = require("../models/Report");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

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
