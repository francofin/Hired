import omitDeep from 'omit-deep';
import React, {createContext, useMemo, useState} from 'react';



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
        city:'',
        stateLocation:'',
        country:'',
        streetAddress:'',
        zipPostalCode:'',
        skills:[],
        positionFilled:false
    };

    const [job, setJob] = useState(initialState);

    const resetJobState = () => {
        setJob(initialState)

        return job
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
            city:userJobs.city,
            stateLocation:userJobs.stateLocation,
            country:userJobs.country,
            streetAddress:userJobs.streetAddress,
            zipPostalCode:userJobs.postalCode,
            skills:userJobs.skills,
            positionFilled:userJobs.positionFilled
        })
    }, [])

    const value = [job, setJob, resetJobState];

    return <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
}

export {JobContext, JobProvider};