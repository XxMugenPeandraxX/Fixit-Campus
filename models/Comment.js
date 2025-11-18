const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
},
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true,
},
}, { collection: 'comments', timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
