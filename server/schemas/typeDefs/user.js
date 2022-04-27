const {gql} = require('apollo-server-express');

module.exports= gql`

    type Image {
        url:String
        public_id:String
    }

    type Video {
        url:String
        public_id:String
    }

    type AwsVideo {
        videoName:String!
        slug: String
        description:String
        videoLink:String
    }

    type Article {
        url:String
        public_id:String
    }

    type Skill{
        _id
        name: String
    }

    type Industry {
        _id:ID!
        name: String
        gicsCode:String
    }

        
    type User{
        _id: ID!
        firstName: String!
        lastName:String!
        userName:String!
        email:String!
        images:[Image]
        articles:[Article]
        videos:[AwsVideo]
        profileTextPargaraph:String
        profileTextPargaraph2: String
        profileTextOptional:String
        profileTextOptional2: String
        age: String
        title:String
        diveristyText:String
        esgText:String
        phoneNumber:String
        industry:Industry
        birthday: Datetime
        createdAt: Datetime
        updatedAt: Datetime
        isPremium: Boolean
        role:[String]
        isCompany:Boolean
        companyName:String
        companyEmail:String
        website:[String]
        entity:String
        country:String
        city:String
        stateLocation:String
        streetAddress:String
        postalCode:String
        zipCode:String
        skills: [Skill]
        connections:[String]
    }

    input SkillInput {
        name: String
    }

    type CreateUserResponse {
        userName:String!
        email: String!  
    }

    input ImageInput {
        url: String
        public_id: String
    }

    input VideoInput {
        url: String
        public_id: String
    }

    input ArticleInput {
        url:String
        public_id: String
    }

    input IndustryInput {
        name: String
        gicsCode:String
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
        title:String
        esgText:String
        industry:IndustryInput
        companyName:String
        phoneNumber:String
        isPremium: Boolean
        isCompany: Boolean
        entity:String
        country:String
        city:String
        website:[String]
        stateLocation:String
        streetAddress:String
        postalCode:String
        zipCode:String
        skills:[SkillInput]
        role:[String]
    }

    type Query {
        profile: User!
        publicProfile(userName:String!): User!
        allUsers: [User!]
        applicants:[User]
        candidates:[User]
        matchedCandidates:[User]
    }


    type Mutation{
        createUser: CreateUserResponse!
        updateUser(input: UpdateUserInput): User!
        addConnection(userId: String!):User
    }


`