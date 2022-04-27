const {gql} = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');
const { User } = require('../../models');
const shortid = require('shortid');
const {DateTimeResolver} = require('graphql-scalars');


const createUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user  = await User.findOne({email: currentUser.email});
    return user ? user : new User({
        email: currentUser.email,
        userName: shortid.generate()
    }).save();
}

const profile = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user  = await User.findOne({email: currentUser.email});
    return user 
}

const publicProfile = async(parent, args, {req}) => {
    const user = await User.findOne({userName: args.userName}).exec();
    return user
}


const updateUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    console.group(args)
    const updatedUser  = await User.findOneAndUpdate({email: currentUser.email}, {...args.input}, {new:true}).exec();
    return updatedUser 
}

const allUsers = async(parent, args, {req}) => await User.find({}).exec();

const addConnection = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = User.findOne({email:currentUser.email}).exec();
    let userConnection = User.findOne({_id:args.userId}).exec();

    if(!userConnection.connections.includes(user._id)) {
        const updatedUser = User.findByIdAndUpdate({_id: user._id}, 
            {connections: userConnection._id}, {new:true}).exec();
        
        return updatedUser;
    }


    return user;
}

module.exports ={
    Query: {
        profile,
        publicProfile,
        allUsers
    },
    Mutation:{
        createUser,
        updateUser,
        addConnection
    }, 

}