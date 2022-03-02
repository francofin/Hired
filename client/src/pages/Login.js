import React, { useState } from "react";
import {  Link } from 'react-router-dom';
import {Image, Icon} from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

// export async function getStaticProps() {
//   return {
//     props: {
//       title: "Sign in",
//       hideHeader: true,
//       hideFooter: true,
//       noPaddingTop: true,
//     },
//   }
// }

const properties  = {
  title: "Sign in",
  hideHeader: true,
  hideFooter: true,
  noPaddingTop: true,
}

const Login = () => {

  const [email, setEmail] = useState("name@address.com");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () =>{


  }


  return (
    <Container fluid className="px-3">
      <Row className="min-vh-100">
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-5">
              <img
                src="/content/svg/logo-square.svg"
                alt="..."
                style={{
                  maxWidth: "4rem",
                }}
                className="img-fluid mb-3"
              />
              <h2>Welcome back</h2>
            </div>
            <Form className="form-validate" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Form.Label htmlFor="loginUsername">Email Address</Form.Label>
                <Form.Control
                  name="loginUsername"
                  id="loginUsername"
                  type="email"
                  value={email}
                  placeholder="name@address.com"
                  autoComplete="off"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  disabled = {loading}
                />
                <div className="mb-4">
                    <span className="text-sm">{email}</span>
              </div>
              </div>
              <div className="mb-4">
                <Row>
                  <Col>
                    <Form.Label htmlFor="loginPassword">Password</Form.Label>
                  </Col>
                  <Col xs="auto">
                    <Link to="#" className="form-text small text-primary">
                      Forgot password?
                    </Link>
                  </Col>
                </Row>
                <Form.Control
                  name="loginPassword"
                  id="loginPassword"
                  type="email"
                  placeholder="Password"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <Form.Check
                  name="loginRemember"
                  id="loginRemember"
                  type="checkbox"
                  className="text-muted"
                  label={
                    <span className="text-sm">Remember me for 30 days</span>
                  }
                />
              </div> */}
              <div className="d-grid">
                <Button size="lg">Sign in</Button>
              </div>
            </Form>
            <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />
            <div className="d-grid gap-2">
              <Button variant="outline-primary" className="btn-social">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="2x"
                  className="btn-social-icon"
                />
                Connect{" "}
                <span className="d-none d-sm-inline">with Facebook</span>
              </Button>
              <Button variant="outline-muted" className="btn-social">
                <FontAwesomeIcon
                  icon={faGoogle}
                  size="2x"
                  className="btn-social-icon"
                />
                Connect <span className="d-none d-sm-inline">with Google</span>
              </Button>
            </div>

            <hr className="my-4" />
            <p className="text-center">
              <small className="text-muted text-center">
                Don't have an account yet?&nbsp;
                  <Link to="/signup">Sign Up</Link>
              </small>
            </p>
              <Link to="/" className="close-absolute me-md-5 me-xl-6 pt-5">
                <Icon icon="close-1" className="w-3rem h-3rem" />
              </Link>
          </div>
        </Col>
        <Col md="4" lg="6" xl="7" className="d-none d-md-block">
          <div className="bg-cover h-100 me-n3  position-relative">
            <Image
              src={`/content/hired_img/login.jpg`}
              alt="Collaborate"
              className="bg-image"
              loading="eager"
              layout="fill"
              priority={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
