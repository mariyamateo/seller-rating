"use client"
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import axios from "axios";
import Box from "@/components/Box";

const supabase = createClient(
  "https://hbdmhlxvvpttebeegkzq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZG1obHh2dnB0dGViZWVna3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDA4NzYsImV4cCI6MjAyODMxNjg3Nn0.PtsbLBnKOwDStOAklI1DnIZZdptUvQHEHfXRhetJBf8"
);
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
  const [user, setUser] = useState<any>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   async function getUserData() {
  //     await supabase.auth.getUser().then((value: any) => {
  //       if (value.data?.user) {
  //         console.log(value.data.user);
  //         setUser(value.data.user);
  //       }
  //     });
  //   }
  //   getUserData();
  // }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get<FeedbackData>(
          "https://pr3-machina-8f32.encr.app/v1/random/seller/feedback"
        );
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div>
      <Box
        header={<h2>Overview:</h2>}
        subheader={<p>Sub</p>}
        content={<p>Helol</p>}
      />

      <p>Five Star Ratings: {feedbackData?.overview.five_star_ratings}</p>
      <p>Four Star Ratings: {feedbackData?.overview.four_star_ratings}</p>
      <p>Three Star Ratings: {feedbackData?.overview.three_star_ratings}</p>
      <p>Two Star Ratings: {feedbackData?.overview.two_star_ratings}</p>
      <p>One Star Ratings: {feedbackData?.overview.one_star_ratings}</p>

      <h2>Details:</h2>
      <ul>
        <li>Shipping Speed: {feedbackData?.details.shipping_speed.score}</li>
        <li>Item Accuracy: {feedbackData?.details.item_accuracy.score}</li>
        <li>
          Packaging Quality: {feedbackData?.details.packaging_quality.score}
        </li>
        <li>
          Seller Communication:{" "}
          {feedbackData?.details.seller_communication.score}
        </li>
      </ul>

      <button onClick={() => signOutUser()}>Sign Out</button>
    </div>
  );
}
