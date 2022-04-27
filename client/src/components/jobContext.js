import omitDeep from 'omit-deep';
import React, {createContext, useMemo, useState} from 'react';
import {useQuery, gql} from '@apollo/client';


const JobContext = createContext([{}, () => {}]);


const JobProvider = (props) => {

    const initialState = {
        title:'',
        descriptionParagraph:'',
        descriptionParagraph2:'',
        email:'',
        images:[],
        videos:[],
        descriptionOptional:'',
        descriptionOptional2:'',
        isCompany:false,
        entity:'employee',
        city:'',
        stateLocation:'',
        country:'',
        streetAddress:'',
        postalCode:'',
        zipCode:'',
        skills:[],
        positionFilled:false
    };

    const [job, setJob] = useState(initialState);

    const resetJobState = () => {
        setProfile(initialState)

        return profile
    };

    useMemo(() => {
        setJob({
            title:userJobs.title,
            descriptionParagraph:userJobs.descriptionParagraph,
            descriptionParagraph2:userJobs.descriptionParagraph2,
            email:userJobs.email,
            images:userJobs.images,
            videos:userJobs.videos,
            descriptionOptional:userJobs.descriptionOptional,
            descriptionOptional2:userJobs.descriptionOptional2,
            isCompany:faluserJobs.isCompany,
            entity:userJobs.entity,
            city:userJobs.city,
            stateLocation:userJobs.stateLocation,
            country:userJobs.country,
            streetAddress:userJobs.streetAddress,
            postalCode:userJobs.postalCode,
            zipCode:userJobs.zipCode,
            skills:userJobs.skills,
            positionFilled:faluserJobs.positionFilled
        })
    }, [])

    const value = [job, setJob, resetJobState];

    return <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
}

export {JobContext, JobProvider};