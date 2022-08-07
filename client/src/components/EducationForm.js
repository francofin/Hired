import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons"

const EducationForm = (props) => {

    

    return (
        <Row>
        <Col md="6">
            <div className="mb-4">
                <Form.Label>Education</Form.Label>
                <Form.Control
                    type="text"
                    input="School Name"
                    name="name"
                    value = {props.educationDetails.name}
                    onChange={(e) => props.onAddEducation(e)}
                />
            </div>
        </Col>
        <Col md="6">
            <div className="mb-4">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    input="School Name"
                    name="location"
                    value = {props.educationDetails.location}
                    onChange={(e) => props.onAddEducation(e)}
                />
            </div>
        </Col>
        <Col md="6">
            <div className="mb-4">
            <Form.Label>Degree</Form.Label>
            <Form.Control
            type="text"
            input="Degree Type"
            name="degree"
            value = {props.educationDetails.degree}
            onChange={(e) => props.onAddEducation(e)}
            />
        </div>
        </Col>
        <Col md="6">
        <div className="mb-4">
            <Form.Label>Area Of Studies</Form.Label>
            <Form.Control
            type="text"
            input="Degree Type"
            name="specialization"
            value = {props.educationDetails.specialization}
            onChange={(e) => props.onAddEducation(e)}
            />
        </div>
      </Col>
      <Col md="6">
            <div className="mb-4">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
            type="date"
            input="Degree Type"
            name="startDate"
            value={props.educationDetails.startDate}
            onChange={(e) => props.onAddEducation(e)}
            />
        </div>
        </Col>
        <Col md="6">
        <div className="mb-4">
            <Form.Label>End Date</Form.Label>
            <Form.Control
            type="date"
            input="Degree Type"
            name="endDate"
            value={props.educationDetails.endDate}
            onChange={(e) => props.onAddEducation(e)}
            />
        </div>
      </Col>
      <Button className="px-3" onClick={props.onSubmitEducation}>
            Add Another
            <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
        </Button>
      </Row>
    )
  }


  export default EducationForm