import { Rating } from "@smastrom/react-rating";
import React from "react";

export default function RatingBreakdownContent({ ...props }) {
  return (
    <div className="flex flex-row p-4 gap-28">
      <div className="flex flex-col gap-3">
        {props.value.map((value: number) => (
          <div key={value} className="flex flex-col gap-20">
            <Rating
              style={{
                maxWidth: 180,
                gap: 2,
                color: "yellow",
              }}
              spaceBetween="small"
              value={props.loading ? 0 : value}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {props.rating.map((rating: any, index: any) => (
          <div key={index} className="text-sm font-medium pb-3">
            {props.loading ? 0 : rating}
          </div>
        ))}
      </div>
    </div>
  );
}
