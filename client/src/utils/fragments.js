import { gql } from "@apollo/client";


const USER_INFO =gql`
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


export default USER_INFO;