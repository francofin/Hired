const {gql} = require('apollo-server-express');

module.exports= gql`
        

    type CreateUserResponse{
        userName:String!
        email: String!  

    }

    type Mutation{
        createUser: CreateUserResponse!
    }


`