"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@/components/Box";
import RatingBreakdownContent from "./RatingBreakdownContent";
import DetailedRatingContent from "./DetailedRatingContent";

interface FeedbackData {
  overview: {
    five_star_ratings: number;
    four_star_ratings: number;
    three_star_ratings: number;
    two_star_ratings: number;
    one_star_ratings: number;
  };
  details: {
    shipping_speed: {
      score: number;
      number_of_ratings: number;
    };
    item_accuracy: {
      score: number;
      number_of_ratings: number;
    };
    packaging_quality: {
      score: number;
      number_of_ratings: number;
    };
    seller_communication: {
      score: number;
      number_of_ratings: number;
    };
  };
}

export default function RatingPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FeedbackData>(
          "https://pr3-machina-8f32.encr.app/v1/random/seller/feedback"
        );
        setFeedbackData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const starValue = [5, 4, 3, 2, 1];
  const criteria = [
    "Shipping Speed",
    "Item Accuracy",
    "Packaging Quality",
    "Seller Communication",
  ];
  const ratingsBreakdown: any[] = [
    feedbackData?.overview.five_star_ratings,
    feedbackData?.overview.four_star_ratings,
    feedbackData?.overview.three_star_ratings,
    feedbackData?.overview.two_star_ratings,
    feedbackData?.overview.one_star_ratings,
  ];

  const scoreRating: any[] = [
    feedbackData?.details.shipping_speed.score,
    feedbackData?.details.item_accuracy.score,
    feedbackData?.details.packaging_quality.score,
    feedbackData?.details.seller_communication.score,
  ];

  const ratingsDetailed: any[] = [
    feedbackData?.details.shipping_speed.number_of_ratings,
    feedbackData?.details.item_accuracy.number_of_ratings,
    feedbackData?.details.packaging_quality.number_of_ratings,
    feedbackData?.details.seller_communication.number_of_ratings,
  ];

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-8">
      <Box
        content={
          <>
            <div>
              <div className="p-4">
                <h1 className="text-sm font-medium">Rating Breakdown</h1>
              </div>
              <div className="flex flex-row gap-60 p-4 border-y-2 bg-[#E3E8EF]">
                <div className="text-xs font-medium">Rating</div>
                <div className="text-xs font-medium"># of ratings</div>
              </div>
              <RatingBreakdownContent
                value={starValue}
                rating={ratingsBreakdown}
                loading={loading}
              />
            </div>
          </>
        }
      />
      <Box
        content={
          <>
            <div>
              <div className="p-4">
                <h1 className="text-sm font-medium">Detailed Ratings</h1>
              </div>
              <div className="flex flex-row gap-60 p-4 border-y-2 bg-[#E3E8EF]">
                <div className="text-xs font-medium">Criteria</div>
                <div className="text-xs font-medium">Rating</div>
                <div className="text-xs font-medium"># of ratings</div>
              </div>
              <DetailedRatingContent
                criteria={criteria}
                score={scoreRating}
                rating={ratingsDetailed}
                loading={loading}
              />
            </div>
          </>
        }
      />
    </div>
  );
}
