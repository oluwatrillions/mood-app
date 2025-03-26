import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying email...");
  
  const {verificationToken} = useParams();

  console.log(verificationToken);
  

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const verifyEmail = async () => {
        const response = await fetch(
          `http://localhost:4000/verify/${verificationToken}`
        );
        const data = await response.json();
        console.log(data);
        // if (data.message === "Email verified successfully") {
        //   setMessage("Email verified successfully");
        //   navigate("/login");
        // }
      };
      verifyEmail();
    } catch {
      // 
      console.log(error);
      
    }
  }, [verificationToken]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
