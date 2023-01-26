const ErrorResponse = require("../utils/errorResponse");
const { User, Project } = require("../schemas/schemas");
const { v4: uuidv4 } = require('uuid');

const login = async (req, res, next) => {
    const { email, password } = req.body
    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
        // Check that user exists by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        // Check that password match
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
}

const register = async (req, res, next) => {
    const { username, email, password, activeProject } = req.body;
    const user = await User.findOne({email})

    console.log(user);
    // try {
    //     const user = await User.create({
    //         username,
    //         email,
    //         id: uuidv4(),
    //         password,
    //         activeProject
    //     });
    //     // console.log(user)
    //     createProject(user)
    //     sendToken(user, 200, res);
    // } catch (error) {
    //     next(error)
    // }
}

const createProject = async (user) => {
    const { activeProject, id, username } = user;
    const project = await Project.create({
        id: uuidv4(),
        name: activeProject,
        ownerId: id,
        members: [{
            userId: id,
            name: username
        }],
        channels: [{
            id: uuidv4(),
            name: "General",
            messages: [{
                id: uuidv4(),
                text: "Welcome, this is the General channel, here you can speak about general topics.",
                user: {
                    name: "Chat Bot",
                    id: "09a5b6bd-cbbd-4591-b189-cef34b1aba7e"
                },
                timestamp: new Date().toISOString()
            }]
        }],
        directMessages: [{
            id: uuidv4(),
            name: "Chat Bot",
            messages: [{
                messageId: uuidv4(),
                text: "In this section you can add project members to privately speak",
                user: {
                    name: "Chat Bot",
                    id: "09a5b6bd-cbbd-4591-b189-cef34b1aba7e"
                },
                timestamp: new Date().toISOString()
            }]
        }]
    })
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};

module.exports = {
    login,
    register
}