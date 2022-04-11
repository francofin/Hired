import { Link } from 'react-router-dom';
import {Icon,Header} from "../components";
import data from "../data/user-account.json";
import { AuthContext } from '../utils/authContext';
import {useQuery, useMutation} from '@apollo/client';
import React, {useEffect, useState, useContext} from "react";
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import {PROFILE} from '../utils/queries';

const UserAccount = () => {

    const {state, dispatch} = useContext(AuthContext);
    const {data} = useQuery(PROFILE);
    const properties = {
        nav: {
            light: true,
            classes: "shadow",
            color: "white",
          },
          loggedUser: true,
          title: "Add your listing",
      }

    return (
    <div style={{paddingTop:'72px'}}>
      <Header headerData={properties} userState={state}/>
        <main>
            <section className="py-5">
                <Container>
                <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Your account</Breadcrumb.Item>
                </Breadcrumb>
        
                <h1 className="hero-heading mb-0">{data.title}</h1>
                <p className="text-muted mb-5">{data.subtitle}</p>
                <Row>
                    {data.cards.map((card) => (
                    <Col xs="6" md="4" className="mb-30px" key={card.title}>
                        <Card className="h-100 border-0 shadow hover-animate">
                        <Card.Body>
                            <div className="icon-rounded bg-secondary-light mb-3">
                            <Icon
                                icon={card.icon}
                                className="text-secondary w-2rem h-2rem"
                            />
                            </div>
                            <Card.Title className="mb-3" as="h5">
                            <Link to={card.link}>
                                <a className="text-decoration-none text-dark stretched-link">
                                {card.title}
                                </a>
                            </Link>
                            </Card.Title>
                            <Card.Text className="text-muted text-sm">
                            {card.content}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
                </Container>
            </section>
        </main>
      </div>
    )
}


export default UserAccount;