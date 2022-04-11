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

const updateUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    console.group(args)
    const updatedUser  = await User.findOneAndUpdate({email: currentUser.email}, {...args.input}, {new:true}).exec();
    return updatedUser 
}

module.exports ={
    Query: {
        profile,
    },
    Mutation:{
        createUser,
        updateUser
    }, 

}