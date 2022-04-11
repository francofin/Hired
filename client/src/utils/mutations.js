import { gql } from '@apollo/client';
import {USER_INFO} from './fragments';

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateuser(input: $input) {
           ...userInfo
        }
    }
    ${USER_INFO}
`


export const CREATE_USER = gql`
    mutation createUser {
      createUser{
        userName
        email
      }
    }
`




// const UPDATE_USER = gql`
//     mutation updateUser($input: UpdateUserInput!) {
//         updateuser(input: $input) {
//             _id
//             firstName
//             lastName
//             userName
//             email
//             profileTextPargaraph
//             profileTextPargaraph2
//             profileTextOptional
//             profileTextOptional2
//             age
//             diveristyText
//             esgText
//             phoneNumber
//             birthday
//             createdAt
//             updatedAt
//             role
//             isCompany
//             entity
//             country
//             city
//             stateLocation
//             streetAddress
//             postalCode
//             skills{
//                 name
//             }
//             images {
//                 url
//                 public_id
//             }
//             videos {
//             url
//             public_id
//             }
//             articles {
//                 url
//                 public_id
//             }
//         }
//     }

// `