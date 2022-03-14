import swal from 'sweetalert';
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {fireBaseAuth} from '../utils/firebase';
import {Image, Icon, Spinner} from "../components";
import { sendPasswordResetEmail  } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const properties  = {
    title: "Sign up",
    hideHeader: true,
    hideFooter: true,
    noPaddingTop: true,
  }

 const handleSubmit = async(e) =>{
   e.preventDefault();
   setLoading(true);
   const auth = fireBaseAuth;
   const config = {
     url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
     handleCodeInApp: true
   }
  await sendPasswordResetEmail(auth, email, config)
  .then(() => {
      setEmail("");
      setLoading(false);
      swal({
        title: `Success, Email sent to ${email}, Please check your email to reset you password!`,
        icon: "success",
      })
    }).catch(error => {
        setLoading(false);
        swal({
            title: `Error Sending Email, Please check the email you supplied is accurate!`,
            icon: "error",
          })
        
    })
    
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
              <h2>Reset Your Password</h2>
              <p className="text-muted">
                Please enter the email used to create your account, We'll send you your reset link right away to get back to business.
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
                <Button size="lg" type="submit" disabled={!email || loading}>Send Reset Link</Button>
              </div>
            </Form>
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

export default ForgotPassword;
