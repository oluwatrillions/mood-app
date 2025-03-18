import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const verifyEmail = () => {
  const [message, setMessage] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  const verificationToken = searchParams.get("verificationToken");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const verifyEmail = async () => {
        const response = await fetch(
          `http://localhost:4000/verify/${verificationToken}`
        );
        const data = await response.json();
        console.log(data);
        if (data.message === "Email verified successfully") {
          setMessage("Email verified successfully");
          navigate("/login");
        }
      };
      verifyEmail();
    } catch {
      setMessage("An error occurred");
    }
  }, [verificationToken]);

  return (
    <div>
      <h3>Email Verification</h3>
      <h2>{message}</h2>
    </div>
  );
};

export default verifyEmail;
