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
            return next(new ErrorResponse("Invalid email", 401));
        }
        // Check that password match
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid password", 401));
        }
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
}

const register = async (req, res, next) => {
    const { username, email, password, activeProject } = req.body;
    const user = await User.findOne({ email })
    try {
        if (!user) {
            const user = await User.create({
                username,
                email,
                id: uuidv4(),
                password,
                activeProject
            });
            createProject(user)
            sendToken(user, 201, res);
        } else {
            // return next(new ErrorResponse(" Email Already registered, please check your data", 401))
            res.send({ status: 409, message: " Email Already registered, please check your data" })
        }
    } catch (error) {
        next(error)
    }
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

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send('Token não fornecido');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Token inválido');
        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    login,
    register,
    verifyToken
}