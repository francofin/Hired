import {Header} from '../components';
import blog from "../data/blog.json";
import data from "../data/index.json";
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';   
import React, {useState, useContext} from "react";
import { AuthContext } from '../utils/authContext';
import {gql, useQuery, useLazyQuery} from "@apollo/client";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import {Image, Swiper, SearchBar, LastMinute, Guides, Instagram, CardPost, SwiperTestimonial, Icon} from "../components";

const getAllPosts = gql`
            {
                allPosts {
                    id
                    title
                    description
                }
            }
        `;

const Index = () => {


  const properties = {
    nav: {
      light: true,
      classes: "shadow",
      color: "white",
    },
    title: "Homepage",
  }

  const {state, dispatch} = useContext(AuthContext);

  console.log("Posts", useQuery(getAllPosts));


  // console.log(postData)

  return (
      <div style={{paddingTop:'72px'}}>
      <Header headerData={properties} userState={state}/>
      <main>
      <section className="hero-home">
        <Swiper
          className="hero-slider"
          wrapperClasses="dark-overlay"
          data={data.swiperImages}
          simple
          effect="fade"
          speed={2000}
          autoplay={{
            delay: 10000,
          }}
        />
        <Container className="py-6 py-md-7 text-white z-index-20">
          <Row>
            <Col xl="10">
              {data.hero && (
                <div className="text-center text-lg-start">
                  <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">
                    {data.hero.subTitle}
                  </p>
                  <h1 className="display-3 fw-bold text-shadow">
                    {data.hero.title}
                  </h1>
                </div>
              )}
              <SearchBar
                options={data.searchOptions}
                className="mt-5 p-3 p-lg-1 ps-lg-4"
                btnClassName="rounded-pill"
                id="index-1-searchbar"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {data.topBlocks && (
        <section className="py-6 bg-gray-100">
          <Container>
            <div className="text-center pb-lg-4">
              <p className="subtitle text-secondary">
                {data.topBlocks.subTitle}
              </p>
              <h2 className="mb-5">{data.topBlocks.title}</h2>
            </div>
            <Row>
              {data.topBlocks.blocks.map((block) => (
                <Col
                  key={block.title}
                  lg="4"
                  className="mb-3 mb-lg-0 text-center"
                >
                  <div className="px-0 px-lg-3">
                    <div className="icon-rounded bg-primary-light mb-3">
                      <Icon
                        icon={block.icon}
                        className="text-primary w-2rem h-2rem"
                      />
                    </div>
                    <h3 className="h5">{block.title}</h3>
                    <p className="text-muted">{block.content}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      <Guides />
      <LastMinute greyBackground />
      {data.jumbotron && (
        <section className="py-7 position-relative dark-overlay">
          <Image
            src={`/content/${data.jumbotron.img}`}
            alt=""
            className="bg-image"
            layout="fill"
          />
          <Container>
            <div className="overlay-content text-white py-lg-5">
              <h3 className="display-3 fw-bold text-serif text-shadow mb-5">
                {data.jumbotron.title}
              </h3>
              <Link to={data.jumbotron.link}>
                <Button variant="light">Get started</Button>
              </Link>
            </div>
          </Container>
        </section>
      )}
      {data.testimonials && (
        <section className="py-7">
          <Container>
            <div className="text-center">
              <p className="subtitle text-primary">
                {data.testimonials.subTitle}
              </p>
              <h2 className="mb-5">{data.testimonials.title}</h2>
            </div>
            <SwiperTestimonial data={data.testimonials.swiperItems} />
          </Container>
        </section>
      )}
      {blog.posts && (
        <section className="py-6 bg-gray-100">
          <Container>
            <Row className="mb-5">
              <Col md="8">
                <p className="subtitle text-secondary">
                  {data.blogPosts.subTitle}
                </p>
                <h2>{data.blogPosts.title}</h2>
              </Col>
              <Col
                md="4"
                className="d-md-flex align-items-center justify-content-end"
              >
                <Link to={data.blogPosts.buttonLink} className="text-muted text-sm">
                  {data.blogPosts.button}
                  <FontAwesomeIcon
                    icon={faAngleDoubleRight}
                    className="ms-2"
                  />
                </Link>
              </Col>
            </Row>
            <Row>
              {blog.posts.map((post, index) => {
                if (index <= 2)
                  return (
                    <Col
                      key={post.title}
                      lg="4"
                      sm="6"
                      className="mb-4 hover-animate"
                    >
                      <CardPost data={post} />
                    </Col>
                  )
              })}
            </Row>
          </Container>
        </section>
      )}

      <Instagram />
      </main>
      </div>

  )
}

export default Index
