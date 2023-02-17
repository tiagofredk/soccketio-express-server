const ErrorResponse = require("../utils/errorResponse");
const { User, Project } = require("../schemas/schemas");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const login = async (req, res, next) => {
    console.log("Print Login Session");
    // console.log(req.session)
    const { email, password } = req.body
    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
        if (req.session.authenticated) {
            console.log("**************************************          if login")
            console.log(req.session)
            res.status(200).json(
                {
                    sucess: true,
                    session: req.session
                });
        } else {
            console.log("**************************************          else login")
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
            createSession(user, 200, req, res);
        }
    } catch (err) {
        next(err);
    }
}


const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    try {
        if (!user) {
            const newUser = await User.create({
                username,
                email,
                // id: uuidv4(),
                password,
                activeProject: "DF"
            });
            console.log("***************                     newUser variable")
            console.log(newUser)
            const _id = newUser
            const updateNewUser = await User.findOne(_id).exec();
            const resNewProject = await createProject(updateNewUser);
            updateNewUser.projects.push(resNewProject._id);
            const updatedUser = await updateNewUser.save((err, updatedUser) => {
                if (err) {
                    // console.log(err);
                    res.status(400).send({ message: err });
                } else {
                    // console.log(updatedUser);
                    createSession(updateNewUser, 201, req, res);
                }
            });
        } else {
            // return next(new ErrorResponse(" Email Already registered, please check your data", 401))
            response(res, 409, " Email Already registered, please check your data");
        }
    } catch (error) {
        next(error)
    }
}

const createProject = async (user) => {
    const { activeProject, _id, username } = user;
    const project = await Project.create({
        // id: uuidv4(),
        name: activeProject,
        ownerId: _id,
        members: [{
            userId: _id,
            name: username
        }],
        channels: [{
            // id: uuidv4(),
            name: "General",
            messages: [{
                // id: uuidv4(),
                text: "Welcome, this is the General channel, here you can speak about general topics.",
                user: {
                    name: "Chat Bot",
                    userId: "09a5b6bd-cbbd-4591-b189-cef34b1aba7e"
                },
                timestamp: new Date().toISOString()
            }]
        }],
        directMessages: [{
            // id: uuidv4(),
            name: "Chat Bot",
            messages: [{
                // messageId: uuidv4(),
                text: "In this section you can add project members to privately speak",
                user: {
                    name: "Chat Bot",
                    // id: "09a5b6bd-cbbd-4591-b189-cef34b1aba7e"
                },
                timestamp: new Date().toISOString()
            }]
        }]
    })
    return project
}

const newProject = async (req, res, next) => {
    const { activeProject, _id, username } = req.body.user;
    try {
        const user = await User.findOne({ _id }).exec();
        user.activeProject = activeProject;
        const resNewProject = await createProject(user);
        user.projects.push(resNewProject._id);
        const updatedUser = await user.save((err, updatedUser) => {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                res.status(201).send({ status: 201, message: `new Project ${activeProject}` });
            }
        });
    } catch (error) {
        next(error)
        res.status(500).send({ message: "Server error" });
    }
};

const deleteProject = async (req, res, next) => {
    const { projectId, user } = req.body;
    const { _id } = req.body.user;
    try {
        if (!user || !projectId) {
            res.status(400).send({ status: 400, message: "Provide the ID of the project" });
            return;
        }
        const userProjectOwner = await User.findOne({ _id }).exec();
        if (!userProjectOwner) {
            res.status(400).send({ status: 400, message: "bad request, user not found" });
        } else {
            userProjectOwner.projects = userProjectOwner.projects.filter(project => project.toString() !== projectId);
            await userProjectOwner.save();
            const project = await Project.findOneAndDelete({ "_id": projectId });
            if (!project) {
                res.status(404).send({ status: 404, message: "Project not found" });
                return;
            }
            res.status(200).send({ status: 200, message: "Project deleted" });
        }
    } catch (error) {
        next(error)
        res.status(500).send({ status: 500, message: "Server error" });
    }
};

const newChannel = async (req, res, next) => {
    const { newChannel, projectId } = req.body;
    try {
        if (!newChannel || !projectId) {
            res.status(400).send({ status: 400, message: "Bad request" })
        }
        const newObjChannel = {
            name: newChannel,
            messages: []
        }
        const project = await Project.findOneAndUpdate(
            { "_id": projectId },
            { $push: { channels: newObjChannel } },
            { new: true }
        )
        if (!project) {
            res.status(400).send({ status: 400, message: "Project Not found" });
        }
        res.status(201).send({ status: 201, message: `New Channel ${newChannel} created` });
    } catch (error) {
        next(error)
        res.status(500).send({status: 500, message: "Server error"})
    }
}

const newChannelMessage = async (req, res, next) => {
    const {message, channelId } = req.body;
    const {username, _id} = req.body.user;
    try {
        if(!message || !username){
            res.status(400).send({status:400, message: "Bad request"})
        }
        const newMessage = {
            text: message,
            user: {
                name: username,
                userId: _id
            },
            timestamp: new Date().toISOString()
        }
        const channel = await Project.findOneAndUpdate(
            {"channels._id": channelId},
            {$push: {"channels.$.messages": newMessage}},
            {new: true}
            )
            if(!channel){
                res.status(400).send({status:400, message: "Channel not found"})
            }
            res.status(201).send({status: 201, message: "Message sent"})
    } catch (error) {
        next(error)
        res.status(500).send({status: 500, message: "Server error"});
    }
}

const deleteChannel = async (req, res, next) => {
    const {channelDump, projectId} = req.body
    try {
        if(!channelDump || !projectId){
            res.status(400).send({status: 400, message: "Bad request"});
        }
        const project = await Project.findOne({"_id": projectId});
        if(!project){
            res.status(400).send({status: 400, message: "Project not found"});
        }
        project.channels = project.channels.filter(obj => obj._id.toString() !== channelDump);
        project.save();
        res.status(200).send({message: "Channel deleted"});
    } catch (error) {
        next(error)
        res.status(500).send({status:500, message: "Server error"})
    }
}

const createSession = async (user, statusCode, req, res) => {
    const token = user.getSignedJwtToken();
    console.log(token);
    user.password = null;
    req.session.token = token;
    req.session.authenticated = true
    req.session.user = user;
    console.log(req.session)
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


const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send('Token não fornecido');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Token inválido');
        req.userId = decoded.userId;
        next();
    });
}

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
    verifyToken,
    logout,
    newProject,
    deleteProject,
    newChannel,
    deleteChannel,
    newChannelMessage
}