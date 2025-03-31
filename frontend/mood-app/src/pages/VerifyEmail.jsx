import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying email...");
  const [isVerified, setIsVerified] = useState(false);
  const {verificationToken} = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    try {
        const verifyEmail = async () => {
          const response = await fetch(
            `http://localhost:4000/verify/${verificationToken}`
          );
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setMessage(data.message);
            setIsVerified(true);
            setTimeout(() => {
              navigate("/signin");
            }, 2000);            
          } else {
            setMessage(data.message);
          }
        };
        verifyEmail();
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while verifying your email.");
    }
  }, [verificationToken, navigate, isVerified]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
