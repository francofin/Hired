const {gql} = require('apollo-server-express');

module.exports= gql`

    scalar Datetime

    type Image {
        url:String
        public_id:String
    }


    type AwsVideo {
        videoName:String!
        slug:String
        description:String
        videoLink:String
    }

    type Article {
        url:String
        public_id:String
    }

    type Education {
        name:String
        degree:String
        startDate:Datetime
        endDate:Datetime
        specialization:String
        location:String
    }

    type Resume {
        url:String
        public_id:String
    }



    type Skill{
        _id:ID!
        name:String
    }

    type Industry {
        _id:ID!
        name:String!
        gicsCode:String
    }

        
    type User{
        _id: ID!
        firstName:String!
        lastName:String!
        userName:String!
        email:String!
        images:[Image]
        articles:[Article]
        resumes:[Resume]
        videos:[AwsVideo]
        profileTextPargaraph:String
        profileTextPargaraph2: String
        profileTextOptional:String
        profileTextOptional2: String
        age: String
        title:String
        education:[Education]
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
        zipPostalCode:String
        skills: [Skill]
        connections:[String]
        matchedJobs:[Job!]
        saveForLater:[Job!]
        appliedTo:[Job!]
        savedJobCount: Int!
        matchedJobCount: Int!
        appliedToCount: Int!
        daysActiveCount: Int!
    }

    input SkillInput {
        name:String
    }

    input EducationInput {
        name:String
        degree:String
        startDate:Datetime
        endDate:Datetime
        specialization:String
        location:String
    }

    type CreateUserResponse {
        userName:String!
        email:String!  
    }

    input ImageInput {
        url:String
        public_id:String
    }

    input VideoInput {
        videoName:String!
        slug:String
        description:String
        videoLink:String
    }

    input ArticleInput {
        url:String
        public_id:String
    }

    input ResumeInput {
        url:String
        public_id:String
    }

    input IndustryInput {
        name:String!
        gicsCode:String
    }


    input UpdateUserInput{
        userName:String
        email:String
        firstName:String
        lastName:String
        age: String
        birthday:Datetime
        createdAt:Datetime
        education:[EducationInput]
        images:[ImageInput]
        videos:[VideoInput]
        articles:[ArticleInput]
        resumes:[ResumeInput]
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
        entity:[String]
        country:String
        city:String
        website:[String]
        stateLocation:String
        streetAddress:String
        zipPostalCode:String
        skills:[SkillInput]
        role:[String]
    }

    type Query {
        profile:User!
        publicProfile(userName: String!):User!
        allUsers:[User!]
        getJobApplicants(userId:String):[User!]
        getJobCandidates(userId:String):[User!]
        getMatchedCandidates(userId:String):[User!]
    }


    type Mutation {
        createUser:CreateUserResponse!
        deleteUserProfileFromJob(userId: String, jobId:String):User!
        deleteUserProfile:User!
        updateUser(input: UpdateUserInput): User!
        applyToJob(jobId: String!): Job!
        saveJob(jobId: String!): Job!
        addConnection(userId: String!): User
    }


`