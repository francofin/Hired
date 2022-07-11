import { Link } from 'react-router-dom';
import dataHero from "../data/messages.json";
import data from "../data/user-profile.json";
import {useQuery, useMutation, gql} from '@apollo/client';
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { AuthContext } from '../utils/authContext';
import React, {useContext, useState, useMemo, useEffect, Fragment} from "react";
import {PROFILE, USER_JOBS} from '../utils/queries';
import {Image, Icon, ReviewForm, Reviews, CardRoom, Header, RichSwiper} from "../components";


const UserMessages = () => {

    const {state, dispatch} = useContext(AuthContext);

    const properties = {
        nav: {
          light: true,
          classes: "shadow",
          color: "white",
        },
        title: "User Profile",
      }

    return(
        <Fragment>
            <div style={{paddingTop:'72px'}}>
                <Header headerData={properties} />
                <main>
                    <section className="d-flex align-items-center dark-overlay">
                        <Image
                            src={`/impressions/${dataHero.hero.img}`}
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
                            <Col lg="12" className="ps-lg-5">
                                <div className="text-block">
                                    <Reviews data={data.reviews} />
                                    <ReviewForm />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    </section>
                </main>
            </div>
        </Fragment>
    )

}


export default UserMessages