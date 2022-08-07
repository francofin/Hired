import axios from 'axios';
import swal from 'sweetalert';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from "react-bootstrap"
import { ProfileContext } from './profileContext';
import { AuthContext } from '../utils/authContext';
import EducationForm from "./EducationForm";
import Select from "react-select"
import { useDropzone } from "react-dropzone"
import Resizer from 'react-image-file-resizer';
import React, {useContext, useEffect, useState} from "react";
import { FormContext } from "../components/FormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons"

const ListingForm = (props) => {
  const data = props.data
  const [formInputs, setFormInputs] = React.useContext(FormContext)
  const {state} = useContext(AuthContext);
  const [skill, setSkill] = useState("Add Skill")
  const [value, setValue] = useState("")
  const[location, setLocation] = useState("")
  const [loading, setLoading] = useState(false);
  const [userImages, setUserImages] = useState([]);;
  const [educationDetail, setEducationDetail] = useState({
    name:"School Name",
    degree:"Degree Type",
    startDate:"",
    endDate:"",
    specialization:"Specialization",
    location:"Where Did You Study"
  })

  const myLocation = useLocation();
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  const {skills} = userProfile;

  useEffect(() => {
    setLocation(myLocation.pathname);
  }, [])


  console.log("My Skills", skills)
  const onAddEducation = (e) => {
    e.preventDefault();
    const value = e.target.value
    console.log(value);
    const {education} = userProfile;
    console.log(education)
    setEducationDetail({ ...educationDetail, [e.target.name]: value  })
  }


  const submitEducation = () => {
    // e.preventDefault();
    console.log("Detail", educationDetail);
    const {education} = userProfile;
    console.log(education)
    education.push(educationDetail)
    setUserProfile({...userProfile, education})
    console.log(userProfile)
  }

  const fileResizerAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            // 
            axios.post(`${process.env.REACT_APP_CLOUDINARYUPLOAD_ENDPOINT}/uploadimagestocloudinary`, {image: uri}, {
              headers:{
                authtoken:state.user.token,
              }
            }).then((response) => {
              setLoading(false)
              console.log("Cloudingary Upload", response)
              setUserProfile({...userProfile, images:[...userProfile.images, response.data]})
              swal({
                title: `Image Successfully Uploaded`,
                icon: "success",
              });
            }).catch(error => {
              setLoading(false)
              console.log("Upload to Cloudinary failed");
              swal({
                title: `Image Upload Failed, Please try again`,
                icon: "error",
              });
            })
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleImageRemove = (id) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_CLOUDINARYUPLOAD_ENDPOINT}/removeimagesfromcloudinary`, {public_id: id},
    {
      headers:{
        authtoken:state.user.token,
      }
    })
    .then((response) => {
      setLoading(false);
      let filteredImages = userProfile.images.filter((item) => {
        return item.public_id !== id;
      });
      setUserProfile({...userProfile, images:filteredImages});
      setUserImages([...filteredImages]);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    })
  }


  

  console.log(educationDetail)


  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setUserImages([...userImages, acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ])
    },
  })


  console.log(userImages)
  

  const onChange = (e) => {
    const value = e.target.value
    console.log(value)
    setUserProfile({ ...userProfile, [e.target.name]: value })
    console.log(formInputs)
  }

  const onCheckboxChange = (e) => {
    const value = e.target.value
    setUserProfile({ ...userProfile, [e.target.id]: !value })
  }


  const onSkillAdd = () => {
    const value = skill;
    skills.push(value);
    console.log("Skills", skills);
    setUserProfile({ ...userProfile, skills })
  }

  const onSkillRemove = () => {
    const value = skill;
    skills.pop();
    console.log("Skills", skills);
    setUserProfile({ ...userProfile, skills })
  }

  const onSelectChange = (name, e) => {
    setFormInputs({ ...formInputs, [name]: e })
  }



  const onButtonDecrease = (e, name) => {
    const value = parseInt(e.target.nextElementSibling.value, 10)
    setFormInputs({ ...formInputs, [name]: value - 1 })
  }
  const onButtonIncrease = (e, name) => {
    const value = parseInt(e.target.previousElementSibling.value, 10)
    setFormInputs({ ...formInputs, [name]: value + 1 })
  }

  return (
    <Form>
      {location === "/education-details" &&
      <Row className="form-block">
          <Col lg="4">
            <h4>Add Education</h4>
            <p className="text-muted text-sm">Start With the most recent, Remember only put what you think is relevant for employers or collaborators to know.</p>
          </Col>
          <Col lg="7" className="ms-auto">
              <EducationForm 
              onAddEducation={onAddEducation} 
              educationDetails={educationDetail}
              onSubmitEducation={submitEducation}/>
          </Col>
      </Row>}
      {data.formBlocks.map((block) => (
        <Row className="form-block" key={block.title}>
          <Col lg="4">
            <h4>{block.title}</h4>
            <p className="text-muted text-sm">{block.content}</p>
           <br/>
           <ul className="list-inline mb-0">
              {skills && skills.map((skill, id) => {
                return(
                        <li key={id} className="list-inline-item">
                            {skill}
                        </li> 
                )})}
              </ul>
           
          </Col>
          <Col lg="7" className="ms-auto">
            {block.inputs.map((input, index) => (
              <React.Fragment key={index}>
                {input.type === "text" && !input.block && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={formInputs[input.name] || ""}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                )}
                {input.type === "text" && input.block === "skill" && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                )}
                {input.type === "textarea" && (
                  <div className="mb-5">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      rows="5"
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={formInputs[input.name] || ""}
                      onChange={(e) => onChange(e)}
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
                      value={formInputs[input.name] || ""}
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
                        onChange={(e) => onChange(e)}
                        checked={formInputs[radio.name] === radio.id}
                        label={radio.label}
                      />
                    ))}
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
                            name={input.name}
                            id={input.name}
                            value={formInputs[input.name] || ""}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "buttons" && !input.block &&(
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
                            value={formInputs[button.name] || 1}
                            disabled
                            className="input-items"
                          />
                          <Button
                            variant="items"
                            className="btn-item-increase"
                            onClick={(e) => onButtonIncrease(e)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "buttons" && input.block &&(
                  <Row>
                    {input.buttons.map((button) => (
                      <Col lg="4" key={button.name}>
                        <Form.Label>{button.label}</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="items"
                            className="btn-item-decrease"
                            onClick={onSkillRemove}
                          >
                            -
                          </Button>
                          <Form.Control
                            name={button.name}
                            value="Go"
                            disabled
                            className="input-items"
                          />
                          <Button
                            variant="items"
                            className="btn-item-increase"
                            onClick={onSkillAdd}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "upload" && input.buttons[0].label === "Add/Remove Image" &&(
                  <Row>
                    {input.buttons.map((button) => (
                      <Col lg="4" key={button.name}>
                        <Form.Label>{button.label}</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="items"
                            className="btn-item-decrease"
                            onClick={handleImageRemove}
                          >
                            -
                          </Button>
                          <Form.Control
                            name={button.name}
                            value="Go"
                            disabled
                            className="input-items"
                          />
                          <Button
                            variant="items"
                            className="btn-item-increase"
                            onClick={fileResizerAndUpload}
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
                            value={formInputs[checkbox.id] || ""}
                            onChange={(e) => onCheckboxChange(e)}
                            label={checkbox.label}
                            className="text-muted"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {input.type === "upload" && input.name==="cover" &&(
                  <div className="mb-4">
                    <div
                      {...getRootProps({ className: "dropzone dz-clickable" })}
                    >
                      <input {...getInputProps()} />
                      <div className="dz-message text-muted">
                        <p>Banner Photo</p>
                        <p>
                          <span className="note">
                            (Uploaded Files)
                          </span>
                        </p>
                      </div>
                    </div>
                    <Row className="mt-4">
                      {userImages[0] &&
                        userImages[0].map((file, i) => (
                          <div key={i} className="col-lg-4">
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
                {input.type === "upload" && input.name==="avatar" && (
                  <div className="mb-4">
                    <div
                      {...getRootProps({ className: "dropzone dz-clickable" })}
                    >
                      <input {...getInputProps()} />
                      <div className="dz-message text-muted">
                        <p>Drop files here or click to upload.</p>
                        <p>
                          <span className="note">
                            (Upload Avatar.)
                          </span>
                        </p>
                      </div>
                    </div>
                    <Row className="mt-4">
                      {userImages[1] &&
                        userImages[1].map((file, i) => (
                          <div key={i} className="col-lg-4">
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

export default ListingForm
