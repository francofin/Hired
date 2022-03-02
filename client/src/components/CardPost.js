import React from "react";
import Image from "./CustomImage";
import { Link } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const CardPost = (props) => {
  const post = props.data
  return (
    <Card className="border-0 h-100 shadow">
      <Link to={`/blog/${post.slug}`} className="">
        <Image
          src={`/content/${post.img}`}
          alt="..."
          width={1080}
          height={720}
          layout="intrinsic"
          className="img-fluid card-img-top"
          // loading={props.eager ? "eager" : "lazy"}
        />
      </Link>
      <Card.Body>
        <Link
          to="#"
          className="text-uppercase text-muted text-sm letter-spacing-2"
        >
          {post.category}
        </Link>
        <h5 className="my-2">
          <Link to={`/blog/${post.slug}`} className="text-dark">{post.title}</Link>
        </h5>
        <p className="text-gray-500 text-sm my-3">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          {post.date}
        </p>
        <p className="my-2 text-muted text-sm">{post.content}</p>
        <Link to={`/blog/${post.slug}`}>
          <Button className="ps-0" variant="link">
            Read more <FontAwesomeIcon icon={faLongArrowAltRight} />
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default CardPost
