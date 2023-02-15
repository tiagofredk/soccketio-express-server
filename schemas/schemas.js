const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto"); Deprecated

// User schema
const UserSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true,
    // },
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    activeProject: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    projects: {type: Array}
});

// Project schema
const projectSchema = new mongoose.Schema({
    // id: { type: String, required: true },
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    members: [{
        userId: { type: String, required: true },
        name: { type: String, required: true }
    }],
    channels: [{
        // id: { type: String, required: true },
        name: { type: String, required: true },
        messages: [{
            // id: { type: String, required: true },
            text: { type: String, required: true },
            user: {
                name: { type: String, required: true },
                // id: { type: String, required: true }
            },
            timestamp: { type: Date, default: Date.now }
        }]
    }],
    directMessages: [{
        // id: { type: String, required: true },
        name: { type: String, required: true },
        messages: [{
            // messageId: { type: String, required: true },
            text: { type: String, required: true },
            user: {
                name: { type: String, required: true },
                // id: { type: String, required: true }
            },
            timestamp: { type: Date, default: Date.now }
        }]
    }]
});

// Create references between User and Project
UserSchema.add({
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// UserSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hash token (private key) and save to database
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     // Set token expire date
//     this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

//     return resetToken;
// };

const User = mongoose.model('users', UserSchema);
const Project = mongoose.model('projects', projectSchema);

module.exports = {
    User,
    Project
}