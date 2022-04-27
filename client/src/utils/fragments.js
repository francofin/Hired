import { gql } from "@apollo/client";


export const USER_INFO =gql`
    fragment userInfo on User {
        _id
        firstName
        lastName
        userName
        email
        profileTextPargaraph
        profileTextPargaraph2
        profileTextOptional
        profileTextOptional2
        age
        diveristyText
        esgText
        phoneNumber
        birthday
        createdAt
        updatedAt
        role
        isCompany
        entity
        country
        city
        stateLocation
        streetAddress
        postalCode
        skills{
            name
        }
        images {
            url
            public_id
        }
        videos {
        url
        public_id
        }
        articles {
            url
            public_id
        }
    }
`


export const JOB_INFO = gql`
    fragment jobInfo on Job {
        _id
        descriptionParagraph
        title
        images {
            url
            public_id
        }
        employer {
            _id
            companyName
            firstName
            lastName
            
        }
        companyName
        createdAt
        skills

    }

`


export default USER_INFO;