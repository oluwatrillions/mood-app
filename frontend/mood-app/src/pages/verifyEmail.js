import React, { useEffect, useState } from "react";

const verifyEmail = () => {
  const [message, setMessage] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  const verificationToken = searchParams.get("verificationToken");

  useEffect(() => {
    try {
      const verifyEmail = async () => {
        const response = await fetch(
          `http://localhost:4000/verify/${verificationToken}`
        );
        const data = await response.json();
        console.log(data);

        setMessage(data.message);
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
