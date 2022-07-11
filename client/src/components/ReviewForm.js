import React, {useState} from "react";
import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

const ReviewForm = () => {
  const [reviewCollapse, setReviewCollapse] = useState(false)
  return (
    <div className="py-5">
      <Button
        type="button"
        variant="outline-primary"
        onClick={() => setReviewCollapse(!reviewCollapse)}
      >
        Leave a review
      </Button>
      <Collapse id="leaveReview" className="mt-4" in={reviewCollapse}>
        <div>
          <h5 className="mb-4">Your Inbox</h5>
          <Form className="form">
            <Row>
              <Col sm="6">
                <div className="mb-4">
                  <Form.Label htmlFor="name">Your name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </Col>
            </Row>
            <div className="mb-4">
              <Form.Label htmlFor="email">Your email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Enter your  email"
                required
              />
            </div>
            <div className="mb-4">
              <Form.Label htmlFor="review">Response</Form.Label>
              <Form.Control
                rows="10"
                type="textarea"
                name="review"
                id="review"
                placeholder="Enter your Message"
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </Collapse>
    </div>
  )
}

export default ReviewForm
