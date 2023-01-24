const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    activeProject: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);

// Project schema
const projectSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    members: [{
        userId: { type: String, required: true },
        name: { type: String, required: true }
    }],
    channels: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        messages: [{
            id: { type: String, required: true },
            text: { type: String, required: true },
            user: {
                name: { type: String, required: true },
                id: { type: String, required: true }
            },
            timestamp: { type: Date, default: Date.now }
        }]
    }],
    directMessages: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        messages: [{
            messageId: { type: String, required: true },
            text: { type: String, required: true },
            user: {
                name: { type: String, required: true },
                id: { type: String, required: true }
            },
            timestamp: { type: Date, default: Date.now }
        }]
    }]
});
module.exports = mongoose.model('Project', projectSchema);

// Create references between User and Project
userSchema.add({
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});
