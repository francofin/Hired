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
        descriptionParagraph:String!
        descriptionParagraph2: String!
        descriptionOptional: String
        descriptionOptional2:String
        images:[ImageInput]
        videos:[VideoInput]
        country:String
        city:String
        stateLocation:String
        streetAddress:String
        postalCode:String
        zipCode:String
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
        stateLocation:String
        streetAddress:String
        postalCode:String
        zipCode:String
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
        postalCode:String
        zipCode:String
        createdAt:Datetime
        positionFilled:Boolean
        skills: [Skill]
        applicants: [User!]
        candidates:[User!]
        matchedCandidates:[User!]
    }

    type Query {
        allJobs: [Job!]!
        userJobs:[Job]
        singleUserJob(jobId:String!):Job!
        matchedJobs:[Job]
        appliedJobs:[Job]
        
    }



    type Mutation {
        newJob(input: JobInput!): Job!
        updateJob(input: UpdateJobInput!): Job!
        deleteJob(jobId: String!): Job!
        applyToJob(jobid:String): Job!
        showUserInterest(userId:String!, jobId:String!): User!
        matchJobAndCandidate(userId: String, jobId: String): User
    }
`