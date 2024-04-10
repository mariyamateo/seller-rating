"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ButtonProps = {
  label: string;
  target: string;
};

const Button = (props: ButtonProps) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  return (
    <button
      className="box-border h-10 w-22 bg-blue-800"
      onClick={() => router.push(props.target)}
    >
      <h3>{loading ? "" : props.label}</h3>
    </button>
  );
};

export default Button;
