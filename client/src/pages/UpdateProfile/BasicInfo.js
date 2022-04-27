import { Link } from 'react-router-dom';
import data from "../../data/user-update.json";
import React, {useState, useContext} from "react";
import { AuthContext } from '../../utils/authContext';
import { Container, Row, Col, Button } from "react-bootstrap";
import { ProfileContext } from '../../components/profileContext';
import {Image, ProgressBar, Header, ProfileForm, FormContext} from "../../components";



const UserAdd1 = () => {

    const [userProfile, setUserProfile] = useContext(ProfileContext);
    
    const properties = {
        nav: {
            light: true,
            classes: "shadow",
            color: "white",
          },
          loggedUser: true,
          title: "Update Your Profile",
          listingForm: true,
      }

  return (
    <div style={{paddingTop:'72px'}}>
    <Header headerData={properties} />
    <React.Fragment>
      <ProgressBar progress={20} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{data[1].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[1].title}
            <span className="text-muted float-end">Step 1</span>
          </h1>

          <ProfileForm data={data[1]} nextStep="/personal-details" />
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}

export default UserAdd1
