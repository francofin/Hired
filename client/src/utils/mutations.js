import { gql } from '@apollo/client';
import {USER_INFO, JOB_INFO} from './fragments';

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

export const CREATE_JOB = gql`
    mutation newJob($input: JobInput!) {
      newJob(input: $input){
        ...jobInfo
      }
    }
    ${JOB_INFO}
`

export const DELETE_JOB = gql`
    mutation deleteJob($jobId: String!) {
      deleteJob(jobId: $jobId){
        _id
      }
    }
`

export const ADD_CONNECTION = gql`
    mutation addConnection($userId: String!){
      addConnection(userId: $userId){
        ...userInfo
      }
    }
    ${USER_INFO}
`