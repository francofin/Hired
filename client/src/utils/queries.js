import { gql } from '@apollo/client';
import {USER_INFO, JOB_INFO} from './fragments';




export const PROFILE = gql`
    query{
      profile{
        ...userInfo

      }
    }
    ${USER_INFO}
    `;

export const GET_ALL_POSTS = gql`
    query {
        allPosts {
            id
            title
            description
        }
    }
`;

export const GET_ALL_JOBS = gql`
    query {
      allJobs {
        ...jobInfo
      }
    }
    ${JOB_INFO}
`

export const USER_JOBS = gql`
    query {
      userJobs {
        ...jobInfo
      }
    }
    ${JOB_INFO}
`;



export const ALL_USERS = gql`
  query {
    allUsers{
        ...userInfo
      }
    }
  ${USER_INFO}
`;

export const PUBLIC_PROFILE = gql`
query publicProfile($userName: String!) {
  publicProfile(userName: $userName) {
    _id
    userName
    firstName
    lastName
    title
    email
    images {
      url
      public_id
    }
  }
}
`;

