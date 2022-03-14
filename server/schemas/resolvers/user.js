const {gql} = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');
const { User } = require('../../models');
const shortid = require('shortid');


const createUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user  = await User.findOne({email: currentUser.email});
    return user ? user : new User({
        email: currentUser.email,
        userName: shortid.generate()
    }).save();
}

module.exports ={
    Mutation:{
        createUser
    }, 

}