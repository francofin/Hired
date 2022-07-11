import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import dataHero from "../data/index2.json"
import data from "../data/user-profile.json";
import dataTag from "../data/detail-rooms.json"
import dataSwiper from "../data/index3.json";
import dataUni from "../data/detail.json"
import '../components/CustomProfileImage.css';
import geoJSON from "../data/rooms-geojson.json";
import { AuthContext } from '../utils/authContext';
import {useQuery, useMutation, gql} from '@apollo/client';
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import React, {useContext, useState, useMemo, useEffect} from "react";
import {Image, Icon, Swiper, Reviews, CardRoom, Header, RichSwiper} from "../components";
import {PROFILE, USER_JOBS} from '../utils/queries';


const UserProfile = () => {


  const {state, dispatch} = useContext(AuthContext);
  const {data:userProfileData} = useQuery(PROFILE);
  // const {data:userJobPostings} = useQuery(USER_JOBS);

  console.log("User Profile from Query", userProfileData)

  const properties = {
    nav: {
      light: true,
      classes: "shadow",
      color: "white",
    },
    title: "User Profile",
  }
  


  return (
    <React.Fragment>
      <div style={{paddingTop:'72px'}}>
    <Header headerData={properties} />
    {/* <Header headerData={properties} userState={state}/> */}
    <main>
    <section className="d-flex align-items-center dark-overlay">
          <Image
            src={`/content/${dataHero.hero.img}`}
            layout="fill"
            className="bg-image"
            alt="Hero image"
            loading="eager"
            priority={true}
          />
          <Container className="py-6 py-lg-7 text-white overlay-content text-center">
            <Row>
              <Col xl="10" className="mx-auto">
                <h1 className="display-3 fw-bold text-shadow">
                  {dataHero.hero.title}
                </h1>
                <p className="text-lg text-shadow">{dataHero.hero.subTitle}</p>
              </Col>
            </Row>
          </Container>
        </section>
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="3" className="me-lg-auto">
            <Card className="border-0 shadow mb-6 mb-lg-0">
              <Card.Header className="bg-gray-100 py-4 border-0 text-center">
                <Link to="#" className="d-inline-block">
                  <div className="avatar avatar-xxl p-2 mb-2">
                    <div className="position-relative h-100 overflow-hidden rounded-circle">
                    <span className="custom-profile-image">
                      <Image
                        src={`/content/img/avatar/${data.avatar}`}
                        alt=""
                        width={144}
                        height={144}
                        className = "custom-user-image"
                      />
                      </span>
                    </div>
                  </div>
                </Link>
                <h5>
                  {data.firstname} {data.lastname}
                </h5>
                <p className="text-muted text-sm mb-0">{data.location}</p>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-rounded icon-rounded-sm bg-primary-light me-2">
                    <Icon
                      icon="diploma-1"
                      className="text-primary svg-icon-md "
                    />
                  </div>
                  <div>
                    <p className="mb-0">{data.reviewsnumber} reviews</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div
                    className={`icon-rounded icon-rounded-sm ${
                      data.verified ? "bg-primary-light" : "bg-gray-200"
                    } me-2`}
                  >
                    <Icon
                      icon={data.verified ? "checkmark-1" : "close-1"}
                      className={`${
                        data.verified ? "text-primary" : "text-muted"
                      } svg-icon-md`}
                    />
                  </div>
                  <div>
                    <p className="mb-0">
                      {data.verified ? "Verified" : "Unverified"}
                    </p>
                  </div>
                </div>
                <hr />
                <h6>{data.firstname} provided</h6>
                <Card.Text className="text-muted" as="ul">
                  {data.provided.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="9" className="ps-lg-5">
            <h1 className="hero-heading mb-0">Hello, I'm {data.firstname}!</h1>
            <div className="text-block">
              <p>
                <Badge bg="secondary-light" text="secondary">
                  Joined in {data.date}
                </Badge>
              </p>
              <h6 className="mb-3">About Me</h6>
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <p className="text-muted">
                  Our garden basement apartment is fully equipped with
                  everything you need to enjoy your stay. Very comfortable for a
                  couple but plenty of space for a small family. Close to many
                  wonderful Brooklyn attractions and quick trip to Manhattan.{" "}
              </p>
              <h6 className="mb-3">The Impression</h6>
                <p className="text-muted fw-light">
                  Welcome to Brooklyn! We are excited to share our wonderful
                  neighborhood with you. Our modern apartment has a private
                  entrance, fully equipped kitchen, and a very comfortable queen
                  size bed. We are happy to accommodate additional guests with a
                  single bed in the living room, another comfy mattress on the
                  floor and can make arrangements for small children with a
                  portable crib and highchair if requested.{" "}
                </p>
                <p className="text-muted fw-light">
                  Welcome to Brooklyn! We are excited to share our wonderful
                  neighborhood with you. Our modern apartment has a private
                  entrance, fully equipped kitchen, and a very comfortable queen
                  size bed. We are happy to accommodate additional guests with a
                  single bed in the living room, another comfy mattress on the
                  floor and can make arrangements for small children with a
                  portable crib and highchair if requested.{" "}
                </p>

                <p className="text-muted fw-light">
                  The apartment is surprisingly quiet for being in the heart of
                  a vibrant, bustling neighborhood.
                </p>
                <h6 className="mb-3">Interaction with guests</h6>
                <p className="text-muted fw-light">
                  We live in the two floors above the garden apartment so we are
                  usually available to answer questions. The garden apartment is
                  separate from our living space. We are happy to provide advice
                  on local attractions, restaurants and transportation around
                  the city. If there's anything you need please don't hesitate
                  to ask!
                </p>
                <div className="text-block">
                    <h4 className="mb-0">Skill Set</h4>
                    <p className="subtitle text-sm text-primary mb-4">
                      Key Tags That Define What I Offer. 
                    </p>
                    <ul className="list-inline">
                      {dataTag.amenities.map((amenity) => (
                        <li
                          key={amenity.value}
                          className="list-inline-item mb-2"
                        >
                          <Badge
                            pill
                            bg="light"
                            className="p-3 text-muted fw-normal"
                          >
                            {amenity.value}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
          </Col>
        </Row>
      </Container>
    </section>
    </main>
    </div>
    {dataUni.similar && (
        <section className="py-6 bg-gray-100">
          <Container>
            <h5 className="mb-0">{dataUni.similar.title}</h5>
            <p className="subtitle text-sm text-primary mb-4">
              {dataUni.similar.subtitle}
            </p>
            <Swiper
              className="swiper-container-mx-negative items-slider pb-5"
              perView={1}
              spaceBetween={20}
              loop
              roundLengths
              md={2}
              lg={3}
              xl={4}
              data={geoJSON.features}
              restaurantCards
            />
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

export default UserProfile;
