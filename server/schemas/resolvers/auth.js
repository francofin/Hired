const {gql} = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');


const me = async (parent, args, {req}) =>{
    // console.log("Context", req)
    await authMiddleware({req});
    return 'Magic';
};



module.exports ={
    Query:{
            me
    }, 

}