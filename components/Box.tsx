import React from "react";

export default function Box({ ...props }) {
  return (
    <div className="border-2 border-buttonColor mx-4 rounded-xl min-w-134 min-h-[357px] shadow-md shadow-[rgba(18, 25, 38, 0.06)]">
      {props.content}
    </div>
  );
}
