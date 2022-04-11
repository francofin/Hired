import { gql } from '@apollo/client';
import USER_INFO from './fragments';




export const PROFILE = gql`
    query{
      profile{
        ...userInfo

      }
    }
    ${USER_INFO}
    `;






// const PROFILE = gql`
// query{
//   profile{
//     _id
//     firstName
//     lastName
//     userName
//     email
//     profileTextPargaraph
//     profileTextPargaraph2
//     profileTextOptional
//     profileTextOptional2
//     age
//     diveristyText
//     esgText
//     phoneNumber
//     birthday
//     createdAt
//     updatedAt
//     role
//     isCompany
//     entity
//     country
//     city
//     stateLocation
//     streetAddress
//     postalCode
//     skills{
//         name
//     }
//     images {
//         url
//         public_id
//     }
//     videos {
//       url
//       public_id
//     }
//     articles {
//         url
//         public_id
//       }

//   }
// }
// `