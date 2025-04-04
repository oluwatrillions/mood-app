import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying email...");
  const {verificationToken} = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    try {
        const verifyEmail = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_URL}/verify/${verificationToken}`
          );
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setMessage(data.message);
            setTimeout(() => navigate("/signin"), 3000);            
          } else if (data.message === "Email already verified"){
            setMessage(data.message);
            setTimeout(() => navigate("/signin"), 3000);
          } else {
            setMessage(data.message)
          }
        };

        verifyEmail();

    } catch (error) {
      console.log(error);
      setMessage("An error occurred while verifying your email.");
    }
  }, [verificationToken]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
