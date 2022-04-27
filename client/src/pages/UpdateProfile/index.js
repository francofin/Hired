import { Link } from 'react-router-dom';
import data from "../../data/user-update.json";
import { AuthContext } from '../../utils/authContext';
import {useQuery, useMutation, gql} from '@apollo/client';
import {Image, ProgressBar, Header} from "../../components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ProfileContext } from '../../components/profileContext';
import React, {useContext, useState, useMemo, useEffect} from "react";


const UpdateProfile = () => {

    
    const [userProfile, setUserProfile] = useContext(ProfileContext);

    console.log("From Profile Context", userProfile);


    const properties = {
      nav: {
          light: true,
          classes: "shadow",
          color: "white",
        },
        loggedUser: true,
        title: "Update Your Profile",
    }


    return (
        <div style={{paddingTop:'72px'}}>
        <Header headerData={properties}/>
        <React.Fragment>
          <ProgressBar progress={0} />
          <section className="py-5 py-lg-7">
            <Container>
              <Row>
                <Col lg="5">
                  <p className="subtitle text-primary">{data[0].subtitle}</p>
                  <h1 className="h2 mb-5">{data[0].title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data[0].content,
                    }}
                  />
                  <p className="mb-5 mb-lg-0">
                    <Link to="basic-info">
                      <Button>{data[0].button}</Button>
                    </Link>
                  </p>
                </Col>
                <Col lg="5" className="ms-auto d-flex align-items-center">
                  <Image
                    src="/content/img/illustration/undraw_celebration_0jvk.svg"
                    width={400}
                    height={279}
                    layout="intrinsic"
                    alt=""
                    className="img-fluid"
                    sizes="(max-width: 576px) 100vw, 530px"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
        </div>
      )
}

export default UpdateProfile;
