const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true }, // for cloudinary
    url: { type: String, required: true },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    location: { type: String, required: true },
    images: {
      type: [imageSchema], // depends if the images are more than one
      validate: [(val) => val.length > 0, "At least one image is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { collection: "reports", timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
