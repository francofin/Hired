import React from "react";
import Swiper from "./Swiper";
import data from "../data/guides.json";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

const Guides = (props) => {
  return (
    <section className={`py-6 ${props.greyBackground ? "bg-gray-100" : ""}`}>
      <Container>
        <Row className="mb-5">
          <Col md="8">
            <p className="subtitle text-primary">{data.subTitle}</p>
            <h2>{data.title}</h2>
          </Col>
          <Col
            md="4"
            className="d-lg-flex align-items-center justify-content-end"
          >
            {data.buttonLink && (
                <Link to={data.buttonLink} className="text-muted text-sm">
                  {data.button}
                  <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-2" />
                </Link>
            )}
          </Col>
        </Row>
        <Swiper
          className="guides-slider mx-n2 pt-3 pb-5"
          perView={1}
          spaceBetween={20}
          imgCards
          loop
          roundLengths
          md={2}
          lg={4}
          xl={5}
          data={data.swiperItems}
        />
      </Container>
    </section>
  )
}

export default Guides
