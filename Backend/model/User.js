const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    UserType: {
        type: String,
        required: true,
        enum: ["Student", "Professor", "College-admin", "University-admin"]
    },
    FollowersMail: {
        type: [String],
        default: []
    },
    Rating: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("User", userSchema);