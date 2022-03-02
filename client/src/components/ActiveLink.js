import React, { Children } from "react";
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


  console.log("Window Props", props);

  return (
    <Link to={props.to}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
