import React from "react"

const CustomImage = (props) => {
  
    return (
      <img
        src={props.src}
        alt={props.alt}
        // width={props.width}
        // height={props.height}
        className={props.className}
      />
    )
}
export default CustomImage
