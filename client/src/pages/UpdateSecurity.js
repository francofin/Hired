import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import {Icon, Header} from "../components";
import data from "../data/user-security.json";
import {fireBaseAuth} from '../utils/firebase';
import React, {useState, useContext} from "react";
import { AuthContext } from '../utils/authContext';
import {useQuery, useMutation} from '@apollo/client';
import { updatePassword, signInWithEmailAndPassword, getIdTokenResult  } from "firebase/auth";
import {Container,Row,Col, Button,Collapse,Badge,Form,Card,Breadcrumb} from "react-bootstrap";
import {PROFILE} from '../utils/queries';



const UpdateSecurity = () => {
  const [loginCollapse, setLoginCollapse] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmedUpdatedPassword, setConfirmedUpdatedPassword] = useState("");


 
  const {data} = useQuery(PROFILE);

  const confirmPasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = fireBaseAuth;
    const email = auth.currentUser.email;
    try{
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (result) => {
          const {user} = result;
          const idTokenResult = await getIdTokenResult(user);
          setConfirmPassword(true);
        });
  
      } catch (err){
        swal({
          title:"Incorrect details, please review your login Credentials",
          icon: "error"
        });
        setConfirmPassword(false);
      }

  }


  const handleSumbit = (e) => {
      e.preventDefault();
      setLoading(true);
      const auth = fireBaseAuth;
      const user = auth.currentUser;
      const updatedUserPassword = updatedPassword;
      const confirmedUpdatedUserPassword = confirmedUpdatedPassword;
      if(updatedUserPassword === confirmedUpdatedUserPassword){
        updatePassword(user, updatedUserPassword).then(() => {
            swal({
                title:"Password successfully Updated.",
                icon: "success"
              });
            
          }).catch((error) => {
            setLoading(false);
            swal({
                title:"Incorrect details, please review your login Credentials",
                icon: "error"
              });
          });
      } else{
        swal({
            title:"Please try again the passwords do not match",
            icon: "error"
          });
      }
      console.log(user)


  }

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
    <Header headerData={properties}/>
        <main>
            <section className="py-5">
            <Container>
                <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account-detail">Account</Breadcrumb.Item>
                <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
                </Breadcrumb>

                <h1 className="hero-heading mb-0">{data.title}</h1>
                <p className="text-muted mb-5">{data.subtitle}</p>
                <Row>
                <Col lg="7">
                    <div className="text-block">
                    <h3 className="mb-4">Login</h3>
                    <Row>
                        <Col sm="8">
                        <h6>Password</h6>
                        <p className="text-sm text-muted">Last updated 3 years ago</p>
                        </Col>
                        <Col className="text-end">
                        <Button
                            onClick={() => setLoginCollapse(!loginCollapse)}
                            variant="link"
                            className="ps-0 text-primary"
                        >
                            Update
                        </Button>
                        </Col>
                    </Row>
                    <Collapse in={loginCollapse}>
                        <Form onSubmit={confirmPasswordUpdate}>
                        <Row className="mt-4">
                            <Col xs="12" className="mb-4">
                            <Form.Label htmlFor="password-current">
                                Current Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password-current"
                                id="password-current"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            </Col>
                        </Row>
                        {!confirmPassword &&
                        <Button type="submit" variant="outline-primary">
                            Update Password
                        </Button>}
                        </Form>
                        
                    </Collapse>
                    <Collapse in={loginCollapse && confirmPassword}>
                        <Form onSubmit={handleSumbit}>
                            <Col md="6" className="mb-4">
                            <Form.Label htmlFor="password-new">
                                New Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password-new"
                                id="password-new"
                                value={updatedPassword}
                                onChange={(e)=>setUpdatedPassword(e.target.value)}
                            />
                            </Col>
                            <Col md="6" className="mb-4">
                            <Form.Label htmlFor="password-confirm">
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password-confirm"
                                id="password-confirm"
                                value={confirmedUpdatedPassword}
                                onChange={(e)=>setConfirmedUpdatedPassword(e.target.value)}
                            />
                            </Col>
                            <Button type="submit" variant="outline-primary">
                                    Confirm Password Update
                            </Button>
                            </Form>  
                        </Collapse>
                    </div>
                    <div className="text-block">
                    <h3 className="mb-4">Social accounts</h3>
                    <Row>
                        <Col sm="8">
                        <h6>Facebook</h6>
                        <p className="text-sm text-muted">Not connected</p>
                        </Col>
                        <Col className="text-end">
                        <Button variant="link" className="ps-0 text-primary">
                            Connect
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8">
                        <h6>Google</h6>
                        <p className="text-sm text-muted">Connected</p>
                        </Col>
                        <Col className="text-end">
                        <Button variant="link" className="ps-0 text-primary">
                            Disconnect
                        </Button>
                        </Col>
                    </Row>
                    </div>
                    <div className="text-block mb-5 mb-lg-0">
                    <h3 className="mb-4">Device history</h3>
                    <div className="d-flex">
                        <div className="icon-rounded bg-secondary-light">
                        <Icon
                            icon="imac-screen-1"
                            className="text-secondary w-2rem h-2rem"
                        />
                        </div>
                        <div className="pt-2 ms-3" body>
                        <strong>Windows 10.0 </strong>· Chrome&nbsp;
                        <Badge
                            bg="secondary-light"
                            text="secondary"
                            className="text-uppercase"
                        >
                            Current Session
                        </Badge>
                        <p className="text-sm text-muted">
                            Ostrava, Moravskoslezsky kraj · April 6, 2020 at 01:51pm
                        </p>
                        <Button variant="text" className="text-primary ps-0">
                            Log out device
                        </Button>
                        </div>
                    </div>
                    </div>
                </Col>
                <Col md="6" lg="4" className="ms-lg-auto">
                    <Card className="border-0 shadow">
                    <Card.Header className="bg-primary-light py-4 border-0">
                        <div className="d-flex align-items-center">
                        <div>
                            <h4 className="h6 subtitle text-sm text-primary">
                            Let's make your account more secure
                            </h4>
                        </div>
                        <Icon
                            icon="shield-security-1"
                            className="svg-icon-light w-3rem h-3rem ms-3 text-primary flex-shrink-0"
                        />
                        </div>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <h6 className="card-text">Your account security:</h6>
                        <p className="card-text mb-4">
                        <Badge bg="info-light" text="info">
                            Medium
                        </Badge>
                        </p>
                        <Card.Text className="text-muted">
                        We’re always working on ways to increase safety in our
                        community.{" "}
                        </Card.Text>
                        <Card.Text className="text-muted card-text">
                        That’s why we look at every account to make sure it’s as
                        secure as possible.
                        </Card.Text>
                        <hr />
                        <Button variant="outline-primary" size="sm">
                        Improve
                        </Button>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
            </section>
        </main>
    </div>
  )
}

export default UpdateSecurity;
