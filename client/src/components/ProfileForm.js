import Select from "react-select";
import { Link } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { ProfileContext } from './profileContext';
import { AuthContext } from '../utils/authContext';
import { Row, Col, Form, Button } from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

const ProfileForm = (props) => {
  const {state, dispatch} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [isCorp, setIsCorp] = useState(false);


  const data = props.data

  const [userProfile, setUserProfile] = useContext(ProfileContext);

  


  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setUserProfile({
        ...userProfile,
        ["files"]: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      })
    },
  })

  const changeValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUserProfile({ ...userProfile, [e.target.name]: value })
  }

  useEffect(() => {
    const isCorporation = userProfile["entity"] === "corporation";
    setUserProfile({ ...userProfile, isCompany: isCorporation })
    if(isCorporation){
      setIsCorp(true);
    } else{
      setIsCorp(false);
    }
  }, [userProfile["entity"]])

  useEffect(() => {

     const setFormEmail = () => {
        if (state.user.email) {
          setUserProfile({ ...userProfile, email: state.user.email })
          setEmail(state.user.email);
        }
      } 

    setFormEmail();

  }, [state.user.email])


useEffect(() => {
    console.log(userProfile)
  }, [userProfile])
  

  const onCheckboxChange = (e) => {
    const value = e.target.value
    setUserProfile({ ...userProfile, [e.target.id]: !value })
  }

  const onSelectChange = (name, e) => {   
    setUserProfile({ ...userProfile, [name]: e.value});
  }


  const onButtonDecrease = (e, name) => {
    const value = parseInt(e.target.nextElementSibling.value, 10)
    setUserProfile({ ...userProfile, [name]: value - 1 })
  }
  const onButtonIncrease = (e, name) => {
    const value = parseInt(e.target.previousElementSibling.value, 10)
    setUserProfile({ ...userProfile, [name]: value + 1 })
  }

  return (
    <Form>
      {data.formBlocks.map((block) => (
        <Row className="form-block" key={block.title}>
          <Col lg="4">
            <h4>{block.title}</h4>
            <p className="text-muted text-sm">{block.content}</p>
          </Col>
          <Col lg="7" className="ms-auto">
            {block.inputs.map((input, index) => (
              <React.Fragment key={index}>
                {input.type === "text" && input.name !== "email" &&(
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={userProfile[input.name] || ""}
                      onChange={(e) => changeValue(e)}
                    />
                  </div>
                )}
                {input.name === "email" && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      input={state.user.email}
                      name={input.name}
                      id={input.name}
                      value={email}
                      onChange={(e) => changeValue(e)}
                    />
                  </div>
                )}
                {input.type === "textarea" && (
                  <div className="mb-5">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      as = {input.type}
                      rows={8}
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={userProfile[input.name] || ""}
                      onChange={(e) => changeValue(e)}
                      aria-describedby={input.helpId}
                    />
                    <small
                      id={input.helpId}
                      className="form-text text-muted mt-2"
                    >
                      {input.help}
                    </small>
                  </div>
                )}
                {input.type === "select" && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Select
                      id={input.name}
                      name={input.name}
                      options={input.options}
                      className="selectpicker"
                      classNamePrefix="selectpicker"
                      // value={userProfile[input.name] || ""}
                      onChange={(e) => onSelectChange(input.name, e)}
                    />
                    {input.text && (
                      <small
                        id="propertyTypeHelp"
                        className="form-text text-muted"
                      >
                        {input.text}
                      </small>
                    )}
                  </div>
                )}
                {input.type === "radios" && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>

                    {input.radios.map((radio) => (
                      <Form.Check
                        key={radio.label}
                        type="radio"
                        id={radio.id}
                        name={radio.name}
                        value={radio.id}
                        onChange={(e) => changeValue(e)}
                        checked={userProfile[radio.name] === radio.id}
                        label={radio.label}
                      />
                    ))}
                    {isCorp && input.text && (
                    <small
                      id="propertyTypeHelp"
                      className="form-text text-muted"
                    >
                      <p className="font-weight-bold py-3" style={{fontSize:13}}>{input.text}</p>
                      <ul className="list-group">
                        {input.definitions.map((link) => (
                          <li><a href={link.link} target="_blank">{link.label}</a></li>
                        ))}
                      </ul>
                    </small>
                  )}
                  </div>      
                )}
                {input.type === "form-group" && (
                  <Row>
                    {input.inputs.map((input) => (
                      <Col md={input.col} key={input.name}>
                        <div className="mb-4">
                          <Form.Label
                            htmlFor={input.name}
                            className="form-label"
                          >
                            {input.label}
                          </Form.Label>
                          <Form.Control
                          type={input.type}
                            name={input.name}
                            id={input.name}
                            value={userProfile[input.name] || ""}
                            onChange={(e) => changeValue(e)}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "buttons" && (
                  <Row>
                    {input.buttons.map((button) => (
                      <Col lg="4" key={button.name}>
                        <Form.Label>{button.label}</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="items"
                            className="btn-item-decrease"
                            onClick={(e) => onButtonDecrease(e, button.name)}
                          >
                            -
                          </Button>
                          <Form.Control
                            name={button.name}
                            value={userProfile[button.name] || 1}
                            disabled
                            className="input-items"
                          />
                          <Button
                            variant="items"
                            className="btn-item-increase"
                            onClick={(e) => onButtonIncrease(e, button.name)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "checkboxes" && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>
                    <ul className="list-inline mb-0">
                      {input.checkboxes.map((checkbox) => (
                        <li key={checkbox.id} className="list-inline-item">
                          <Form.Check
                            type="checkbox"
                            id={checkbox.id}
                            name={checkbox.name}
                            value={userProfile[checkbox.id] || ""}
                            onChange={(e) => onCheckboxChange(e)}
                            label={checkbox.label}
                            className="text-muted"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {input.type === "upload" && (
                  <div className="mb-4">
                    <div
                      {...getRootProps({ className: "dropzone dz-clickable" })}
                    >
                      <input {...getInputProps()} />
                      <div className="dz-message text-muted">
                        <p>Drop files here or click to upload.</p>
                        <p>
                          <span className="note">
                            (This is just a demo dropzone. Selected files are{" "}
                            <strong>not</strong> actually uploaded.)
                          </span>
                        </p>
                      </div>
                    </div>
                    <Row className="mt-4">
                      {userProfile["files"] &&
                        userProfile["files"].map((file) => (
                          <div key={file.name} className="col-lg-4">
                            <div>
                              <img
                                src={file.preview}
                                className="img-fluid rounded shadow mb-4"
                              />
                            </div>
                          </div>
                        ))}
                    </Row>
                  </div>
                )}
              </React.Fragment>
            ))}
          </Col>
        </Row>
      ))}
      <Row className="form-block flex-column flex-sm-row">
        <Col className="text-center text-sm-start">
          {props.prevStep && (
            <Link to={props.prevStep}>
              <Button variant="link" className="text-muted">
                <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                Back
              </Button>
            </Link>
          )}
        </Col>
        <Col className="text-center text-sm-end">
          {props.nextStep && (
            <Link to={props.nextStep}>
              <Button className="px-3">
                Next step
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </Link>
          )}
          {props.finish && (
            <Link to={props.finish}>
              <Button className="px-3">
                Finish
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default ProfileForm
