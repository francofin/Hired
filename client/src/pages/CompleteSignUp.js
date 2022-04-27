import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {fireBaseAuth} from '../utils/firebase';
import {gql, useMutation } from "@apollo/client";
import {Image, Icon, Spinner} from "../components";
import { AuthContext } from '../utils/authContext';
import React, {useEffect, useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signInWithEmailLink, updatePassword, getIdTokenResult } from "firebase/auth";
import { CREATE_USER } from '../utils/mutations';


const CompleteSignUp = () => {

    const properties  = {
        title: "Complete Registration",
        hideHeader: true,
        hideFooter: true,
        noPaddingTop: true,
      }

    const {dispatch} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const[createUser] = useMutation(CREATE_USER);

    let history = useHistory();


    useEffect(() => {
        const userEmail = window.localStorage.getItem("hiredSignInEmail");
        setEmail(userEmail);
    }, [history])


    const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const auth = fireBaseAuth;
    if(!email || !password){
        swal({
            title:"Email and pass word are required to complete the registration",
            icon:"error"
        });
        }
        else if(password !== confirmPassword){
            swal({
                title:"Your Passwords do no match, please try again.",
                icon:"error"
            });
        }


        try{
            const result = await signInWithEmailLink(auth, email, window.location.href);
            console.log(result);
            if(result.user.emailVerified){
                window.localStorage.removeItem('hiredSignInEmail');
                let user = fireBaseAuth.currentUser;
                console.log("User", user);
                await updatePassword(user, password);
                console.log(password);
             
                const idTokenResult = await getIdTokenResult(user);
                console.log("Token", idTokenResult);
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload:{email: user.email, token:idTokenResult.token}
                });

                createUser();

                //save or update user in mongodb

                history.push('/');

            }

        } catch (err){
            console.log("Error with registering your information", err.message);
            setLoading(false);
            swal({
                title:`Error with registration: ${err.message}` ,
                icon:"error"
            })

        }
    }


    // console.log("AUTH", user)

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
                    Complete Your Registration to Get Started. 
                </p>
                </div>
                <Form className="form-validate" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Form.Label htmlFor="loginUsername">Email Address</Form.Label>
                    <Form.Control
                    name="loginUsername"
                    id="loginUsername"
                    type="email"
                    placeholder={email}
                    autoComplete="off"
                    required
                    disabled 
                    />
                </div>
                <div className="mb-4">
                    <Form.Label htmlFor="loginPassword">Password</Form.Label>
                    <Form.Control
                    name="loginPassword"
                    id="loginPassword"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    // required
                    />
                </div>
                <div className="mb-4">
                    <Form.Label htmlFor="loginPassword2">
                    Confirm your password
                    </Form.Label>
                    <Form.Control
                    name="loginPassword2"
                    id="loginPassword2"
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    // required
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

export default CompleteSignUp;
