import React from "react";
import Image from "./CustomImage";


const Avatar = (props) => {

  const choosePx = (props) => {
    let pxSize;
    switch (props.size) {
      case "xxl":
        pxSize = props.border ? 144 : 160
        break
      case "xl":
        pxSize = props.border ? 96 : 112
        break
      case "lg":
        pxSize = props.border ? 72 : 80
        break
      case "sm":
        pxSize = props.border ? 32 : 40
        break
      case "xs":
        pxSize = props.border ? 21 : 28
        break
      case "xxs":
        pxSize = 16
        break
      default:
        pxSize = props.border ? 40 : 48
    };

    return pxSize;
  }

  return (
    <div
      className={`avatar ${props.size ? `avatar-${props.size}` : ""}  ${
        props.className ? props.className : ""
      }`}
    >
      <div className="position-relative overflow-hidden rounded-circle h-100 d-flex align-items-center justify-content-center">
        {props.text ? (
          <span className={`avatar-text avatar-${props.variant}`}>{props.text}</span>
        ) : (
          <Image
            src={props.image}
            layout="fixed"
            className={`rounded-circle ${props.cover ? "bg-image" : ""}`}
            width={choosePx}
            height={choosePx}
            alt={props.alt}
          />
        )}
      </div>
    </div>
  )
};


export default Avatar;