const {gql} = require('apollo-server-express');

module.exports= gql`
    scalar Datetime
    
    type Image {
        url:String
        public_id:String
    }


    input JobInput {
        _id: ID!
        title: String!
        email:String!
        descriptionParagraph:String!
        descriptionParagraph2: String!
        descriptionOptional: String
        descriptionOptional2:String
        images:[ImageInput]
        videos:[VideoInput]
        country:String
        city:String
        createdAt: Datetime
        stateLocation:String
        streetAddress:String
        zipPostalCode:String
        positionFilled:Boolean
        skills: [SkillInput]
    }

    input UpdateJobInput {
        _id: String!
        title: String!
        descriptionParagraph:String!
        descriptionParagraph2: String!
        descriptionOptional: String
        descriptionOptional2:String
        images:[ImageInput]
        videos:[VideoInput]
        country:String
        city:String
        updatedAt: Datetime
        stateLocation:String
        streetAddress:String
        zipPostalCode:String
        positionFilled:Boolean
        skills: [SkillInput]
    }

    type Job {
        _id: ID!
        title: String!
        descriptionParagraph:String!
        descriptionParagraph2: String!
        descriptionOptional: String
        descriptionOptional2:String
        employer:User
        images:[Image]
        videos:[AwsVideo]
        country:String
        city:String
        stateLocation:String
        streetAddress:String
        zipPostalCode:String
        createdAt:Datetime
        updatedAt: Datetime
        positionFilled:Boolean
        skills: [Skill]
        applicants: [User!]
        candidates:[User!]
        matchedCandidates:[User!]
        applicantCount: Int!
        candidateCount: Int!
        matchCount: Int!
        daysActiveCount: Int!
    }

    type Query {
        allJobs: [Job!]!
        userJobs: [Job!]!
        singleUserJob(jobId: String!): Job!
        matchedJobs:[Job]
        appliedJobs:[Job]
        
    }



    type Mutation {
        newJob(input: JobInput!): Job!
        updateJob(input: UpdateJobInput!): Job!
        deleteJob(jobId: String!): Job!
        showUserInterest(userId:String!, jobId:String!): User!
    }
`