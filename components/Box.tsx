import React from "react";

export default function Box({ ...props }) {
  return (
    <div className="border-8 border-black m-8">
      <div>
        <div>{props.header}</div>
      </div>
      <div>
        <div>{props.subheader}</div>
      </div>
      <div>
        <div>{props.content}</div>
      </div>
    </div>
  );
}
