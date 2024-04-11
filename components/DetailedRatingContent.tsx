import { Rating } from "@smastrom/react-rating";
import React from "react";

export default function DetailedRatingContent({ ...props }) {
  return (
    <div className="flex flex-row p-4 gap-28">
      <div className="flex flex-col gap-8">
        {props.criteria.map((criteria: string) => (
          <div key={criteria}>
            <p>{criteria}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {props.score.map((score: any) => (
          <div key={score}>
            <Rating
              style={{
                maxWidth: 180,
                gap: 2,
                color: "yellow",
              }}
              spaceBetween="small"
              value={props.loading ? 0 : score}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {props.rating.map((number_of_ratings: any) => (
          <div key={number_of_ratings}>
            <p>{props.loading ? 0 : number_of_ratings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
