const {gql} = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');

const me = async (parent, args, context) =>{
    console.log("Context", context.req.headers)
    await authMiddleware(context);
    return 'Magic';
};


module.exports ={
    Query:{
            me
    }
}