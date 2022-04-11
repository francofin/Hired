import omitDeep from 'omit-deep';
import React, {createContext, useMemo, useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import {PROFILE} from '../utils/queries';

const ProfileContext = createContext([{}, () => {}]);

const ProfileProvider = (props) => {

    const [profile, setProfile] = useState({
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        images:[],
        videos:[],
        articles:[],
        profileTextPargaraph:'',
        profileTextPargaraph2:'',
        profileTextOptional:'',
        profileTextOptional2:'',
        diveristyText:'',
        esgText:'',
        age:'',
        location:'',
        birthday:'',
        isPremium:false,
        phoneNumber:'',
        role:'Job Seeker',
        isCompany:false,
        entity:'employee',
        city:'',
        stateLocation:'',
        country:'',
        streetAddress:'',
        postalCode:'',
        skills:[]
    });

    // const PROFILE = gql`
    //       query{
    //         profile{
    //           _id
    //           firstName
    //           lastName
    //           userName
    //           images {
    //               url
    //               public_id
    //           }
    //           videos {
    //             url
    //             public_id
    //           }
    //         }
    //       }
    // `

    const {data} = useQuery(PROFILE);


    useMemo(() => {

        if(data){
            setProfile({
                firstName:data.profile.firstName,
                lastName:data.profile.lastName,
                userName:data.profile.userName,
                email:data.profile.email,
                images:omitDeep(data.profile.images, ["__typename"]),
                videos:data.profile.videos,
                articles:data.profile.articles,
                profileTextPargaraph:data.profile.profileTextPargaraph,
                profileTextPargaraph2:data.profile.profileTextPargaraph2,
                profileTextOptional:data.profile.profileTextOptional,
                profileTextOptional2:data.profile.profileTextOptional2,
                diveristyText:data.profile.diveristyText,
                esgText:data.profile.esgText,
                age:data.profile.age,
                location:data.profile.location,
                birthday:data.profile.birthday,
                isPremium:data.profile.isPremium,
                phoneNumber:data.profile.phoneNumber,
                role:data.profile.role,
                isCompany:data.profile.isCompany,
                entity:data.profile.entity,
                city:data.profile.city,
                stateLocation:data.profile.stateLocation,
                country:data.profile.country,
                streetAddress:data.profile.streetAddress,
                postalCode:data.profile.postalCode,
                skills:data.profile.skills
            })
        } 
        
    }, [])

    const value = [profile, setProfile];

    return <ProfileContext.Provider value={value}>{props.children}</ProfileContext.Provider>
}


export {ProfileContext, ProfileProvider};