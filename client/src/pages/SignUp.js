import swal from 'sweetalert';
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {fireBaseAuth} from '../utils/firebase';
import {Image, Icon, Spinner} from "../components";
import { sendSignInLinkToEmail } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";


const properties  = {
  title: "Sign up",
  hideHeader: true,
  hideFooter: true,
  noPaddingTop: true,
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async(e) =>{
   e.preventDefault();
   setLoading(true);
   const auth = fireBaseAuth;
   const config = {
     url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
     handleCodeInApp: true
   }
  await sendSignInLinkToEmail(auth, email, config);
  window.localStorage.setItem('hiredSignInEmail', email);
  swal({
    title: `Success, Email sent to ${email}, Please check your email to complete your registration!`,
    icon: "success",
  });
  setEmail("");
  setLoading(false);
  console.log("clicked")
    
  }

  console.log("AUTH", fireBaseAuth)

  return (
    <Container fluid className="px-3">
      {loading ? <Spinner /> : ""}
      <Row className="min-vh-100">
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xxl-6 position-relative">
            <div className="mb-4">
              <img
                src="/content/svg/logo-square.svg"
                alt="..."
                style={{ maxWidth: "4rem" }}
                className="img-fluid mb-3"
              />
              <h2>Sign up</h2>
              <p className="text-muted">
                Please enter a valid, email, we'll send a confirmation to get you all set up and on your career journey.
                Congrations on taking your first step and we're proud to help you along the way.
              </p>
            </div>
            <Form className="form-validate" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Form.Label htmlFor="loginUsername">Email Address</Form.Label>
                <Form.Control
                  name="loginUsername"
                  id="loginUsername"
                  type="email"
                  placeholder="name@address.com"
                  autoComplete="off"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  disabled = {loading}
                />
              </div>
              <div className="d-grid">
                <Button size="lg" type="submit" disabled={!email || loading}>Sign up</Button>
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
            <p className="text-sm text-muted">
              By signing up you agree to Directory's{" "}
              <Link to="#">Terms and Conditions</Link> and{" "}
              <Link to="#">Privacy Policy</Link>.
            </p>   
              <Link to="/" className="close-absolute me-md-5 me-xl-6 pt-5">
                <Icon icon="close-1" className="w-3rem h-3rem" />
              </Link>
          </div>
        </Col>
        <Col md="4" lg="6" xl="7" className="d-none d-md-block">
          <div className="bg-cover h-100 me-n3 position-relative">
            <Image
              src={`/content/hired_img/signup.jpg`}
              alt=""
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

export default Signup;
