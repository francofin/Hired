import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Pagination, Button, Card } from "react-bootstrap";
import {CardPost, Image, Header} from "../components";
import updateTechNews from "../actions/updateTechNews";
import updatepull from "../actions/updatepull";
import data from "../data/blog.json";
import {connect} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import {
  faChevronLeft,
  faChevronRight,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";


const TechNews = (props) => {

  const [techNewsArticle, setTechNewsArticles] = useState([]);


  useEffect(() => {
    const allNews = props.techNewsData;
    console.log(allNews);
    //if check to see if time to refresh state.
    console.log(props.timerData.isRefreshNeeded)
    // props.updateTechNews();
    if(props.timerData.isRefreshNeeded){
      const newsArticles = props.updateTechNews();
      setTechNewsArticles(newsArticles)
      props.updatepull();
    }
  }, [])

    


    const properties = {
        nav: {
          light: true,
          classes: "shadow",
          color: "white",
        },
        title: "Blog",
      }

  const featuredPost = data.posts[0]

//   if(props.)

  return (
    <div style={{paddingTop:'72px'}}>
    <Header headerData={properties} />
    <React.Fragment>
      {featuredPost && (
        <section className="position-relative py-6">
          {featuredPost.img && (
            <Image
              src={`/content/${featuredPost.img}`}
              alt={featuredPost.title}
              className="bg-image"
              loading="eager"
              layout="fill"
              priority={true}
            />
          )}
          <Container className="position-relative">
            <Row>
              <Col lg="6">
                <Card>
                  <Card.Body className="p-5">
                    <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">
                      {featuredPost.subtitle}
                    </strong>
                    <h2 className="mb-3">{featuredPost.title}</h2>
                    <p className="text-muted">{featuredPost.content}</p>
                    <Link
                      to="/blog/[slug]"
                      as={`/blog/${featuredPost.slug}`}
                    >
                      <Button variant="link" className="p-0">
                        Continue reading{" "}
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <section className="py-6">
        <Container>
          <Row className="mb-5">
            {data.posts &&
              data.posts.map((post, index) => {
                // the first post is featured
                if (index >= 1)
                  return (
                    <Col
                      key={index}
                      sm="6"
                      lg="4"
                      className="mb-4 hover-animate"
                    >
                      <CardPost data={post} index={index} />
                    </Col>
                  )
              })}
          </Row>
          <Pagination
            aria-label="Page navigation example"
            className="d-flex justify-content-between mb-5"
          >
            <Pagination.Item href="#" className="text-sm">
              <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
              Older posts
            </Pagination.Item>
            <Pagination.Item href="#" className="disabled text-sm">
              Newer posts
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Pagination.Item>
          </Pagination>
        </Container>
      </section>
    </React.Fragment>
    </div>
  )
}


function mapStateToProps(state){
    return {
        techNewsData:state.techNews,
        timerData:state.timer
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
            updateTechNews:updateTechNews,
            updatepull
          }, dispatch)
}


// export default TechNews
export default connect(mapStateToProps, mapDispatchToProps)(TechNews);