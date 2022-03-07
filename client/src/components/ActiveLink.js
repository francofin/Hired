import React, { Children } from "react";
import { Dropdown } from "react-bootstrap";
import { BrowserRouter as Router, Link} from 'react-router-dom';



const ActiveLink = ({ children, activeClassName, ...props }) => {
  // const { asPath } = useRouter()
  const asPath = window.location.pathname;
  const child = Children.only(children)
  const childClassName = child.props.className || ""

  const className =
    asPath === props.to
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName


  console.log("Window Props", children);

  return (
    <div>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </div>
  )
}

export default ActiveLink
