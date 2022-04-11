const {gql} = require('apollo-server-express');

module.exports= gql`
    scalar Datetime


    type Image {
        url:String
        public_id:String
    }

    type Video {
        url:String
        public_id:String
    }

    type Article {
        url:String
        public_id:String
    }

    type Skill{
        name: String
    }

        
    type User{
        _id: ID!
        firstName: String
        lastName:String
        userName:String
        email:String
        images:[Image]
        articles:[Article]
        videos:[Video]
        profileTextPargaraph:String
        profileTextPargaraph2: String
        profileTextOptional:String
        profileTextOptional2: String
        age: String
        diveristyText:String
        esgText:String
        phoneNumber:String
        birthday: Datetime
        createdAt: Datetime
        updatedAt: Datetime
        isPremium: Boolean
        role:[String]
        isCompany:Boolean
        entity:String
        country:String
        city:String
        stateLocation:String
        streetAddress:String
        postalCode:String
        skills: [Skill]

    }

    input SkillInput{
        name: String
    }

    type CreateUserResponse{
        userName:String!
        email: String!  
    }

    input ImageInput{
        url: String
        public_id: String
    }

    input VideoInput{
        url: String
        public_id: String
    }

    input ArticleInput{
        url:String
        public_id: String
    }


    input UpdateUserInput{
        userName: String
        email: String
        firstName: String
        lastName: String
        age: String
        birthday: Datetime
        createdAt: Datetime
        images:[ImageInput]
        videos:[VideoInput]
        articles:[ArticleInput]
        profileTextPargaraph:String
        profileTextPargaraph2: String
        profileTextOptional:String
        profileTextOptional2: String
        diveristyText:String
        esgText:String
        phoneNumber:String
        isPremium: Boolean
        isCompany: Boolean
        entity:String
        country:String
        city:String
        stateLocation:String
        streetAddress:String
        postalCode:String
        skills:[SkillInput]
        role:[String]
    }

    type Query {
        profile: User!
    }

    type Mutation{
        createUser: CreateUserResponse!
        updateUser(input: UpdateUserInput): User!
    }


`