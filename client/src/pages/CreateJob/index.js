import { Link } from 'react-router-dom';
import data from "../../data/user-add.json";
import React, {useState, useContext} from "react";
import { AuthContext } from '../../utils/authContext';
import {Image, ProgressBar, Header} from "../../components";
import { Container, Row, Col, Button } from "react-bootstrap";



const CreateJob = () => {

    const {state, dispatch} = useContext(AuthContext);

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
    <React.Fragment>
      <ProgressBar progress={0} />
        <main>
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
                <Link href="user-add-1" passHref>
                  <Button>{data[0].button}</Button>
                </Link>
              </p>
            </Col>
            <Col lg="5" className="ms-auto d-flex align-items-center">
              <Image
                src="/content/img/illustration/undraw_adventure_4hum.svg"
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
      </main>
    </React.Fragment>
    </div>
  )
}

export default CreateJob;
