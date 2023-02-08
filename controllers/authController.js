const ErrorResponse = require("../utils/errorResponse");
const { User, Project } = require("../schemas/schemas");
const { v4: uuidv4 } = require('uuid');

const login = async (req, res, next) => {
    console.log("Print Login Session");
    console.log(req.session)
    const { email, password } = req.body
    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
        if (req.session.authenticated) {
            console.log("if login")
            res.status(200).json(
                {
                    sucess: true,
                    session: req.session
                });
        } else {
            console.log("else login")
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
            // sendToken(user, 200, req, res);
            createSession(user, 200, req, res)
        }
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
            await createProject(user)
            // await sendToken(user, 201, req, res);
            await createSession(user, 201, req, res);
        } else {
            // return next(new ErrorResponse(" Email Already registered, please check your data", 401))
            response(res, 409, " Email Already registered, please check your data")
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

const createSession = async (user, statusCode, req, res) => {
    user.password = null;
    // console.log(req.session);
    // console.log(req.sessionID);
    req.session.authenticated = true
    // console.log("user");
    // console.log(user);
    req.session.user = user;
    res.status(statusCode).json(
        {
            sucess: true,
            session: req.session
        });
}

const sendToken = (user, statusCode, req, res) => {
    // req.session.autenticated = true
    const token = user.getSignedJwtToken();
    res.status(statusCode).json(
        {
            sucess: true,
            session: req.session
        });
};

// const verifyToken = async (req, res, next) => {
//     const token = req.headers['x-access-token'];
//     if (!token) return res.status(401).send('Token não fornecido');
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(500).send('Token inválido');
//         req.userId = decoded.userId;
//         next();
//     });
// }

const logout = async (req, res) => {
    req.session.destroy();
    response(res, 200, "Session destroyed");
}

const response = (res, code, message) => {
    res.status(code).send({ status: code, message: message })
}

module.exports = {
    login,
    register,
    // verifyToken,
    logout
}