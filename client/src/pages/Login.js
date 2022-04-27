import swal from 'sweetalert';
import {Image, Icon} from "../components";
import { CREATE_USER } from '../utils/mutations';
import {gql, useMutation } from "@apollo/client";
import { AuthContext } from '../utils/authContext';
import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {fireBaseAuth, googleAuthProvider, facebookAuthProvider} from '../utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup, getIdTokenResult, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



// const CREATE_USER = gql`
//     mutation createUser {
//       createUser{
//         userName
//         email
//       }
//     }
// `

const Login = () => {

  const properties  = {
    title: "Sign in",
    hideHeader: true,
    hideFooter: true,
    noPaddingTop: true,
  };

  const {dispatch} = useContext(AuthContext);
  const [email, setEmail] = useState("name@address.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const auth = fireBaseAuth;

  const[createUser] = useMutation(CREATE_USER);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    
    try{
      await signInWithEmailAndPassword(auth, email, password)
      .then( async (result) => {
        const {user} = result;
        const idTokenResult = await getIdTokenResult(user);
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{email: user.email, token:idTokenResult.token}
      });


        createUser();
        history.push('/');
      });

    } catch (err){
      swal({
        title:"Incorrect details, please review your login Credentials",
        icon: "error"
      })
    }
  }


  const logInWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      await signInWithPopup(auth, googleAuthProvider)
      .then( async (result) => {
        console.log("Google Auth", result);
        const {user} = result;
        const idTokenResult = await getIdTokenResult(user);
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{email: user.email, token:idTokenResult.token}
      });

      
      createUser();
      history.push('/');
      })

    }
    catch(err){
      swal({
        title:`Please review your Google login Credentials. ${err}`,
        icon: "error"
      })
    }
    
  }

  const logInWithFaceBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      await signInWithPopup(auth, facebookAuthProvider)
      .then( async (result) => {
        console.log("Google Auth", result);
        const {user} = result;
        const idTokenResult = await getIdTokenResult(user);
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{email: user.email, token:idTokenResult.token}
      });

      history.push('/');
      })

    }
    catch(err){
      swal({
        title:`Please review your Google login Credentials. ${err}`,
        icon: "error"
      })
    }
    
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
                    <Link to="/password-reset" className="form-text small text-primary">
                      Forgot password?
                    </Link>
                  </Col>
                </Row>
                <Form.Control
                  name="loginPassword"
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
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
                <Button size="lg"  type="submit">Sign in</Button>
              </div>
            </Form>
            <hr data-content="OR" className="my-3 hr-text letter-spacing-2" />
            <div className="d-grid gap-2">
              <Button variant="outline-primary" className="btn-social" type="submit" onClick={logInWithFaceBook}>
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="2x"
                  className="btn-social-icon"
                />
                Connect{" "}
                <span className="d-none d-sm-inline">with Facebook</span>
              </Button>
              <Button variant="outline-muted" className="btn-social" type="submit" onClick={logInWithGoogle}>
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

export default Login;
