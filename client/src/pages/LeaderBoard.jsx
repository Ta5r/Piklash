import React, { useEffect } from "react";

const Challenge = () => {
  
  const callChallengePage = async () => {
    // try {
    //   let data = await fetch("/profile", {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   });
    //   data = await data.json();
    //   console.log(data);      
    //   setName(data.name);
    //   setPhone(data.phone);
    //   setEmail(data.email);
    //   setImg(data.selectedFile);
    //    if (!data.status === 200) {
    //     const error = new Error(data.error);
    //     throw error;
    //   }
    // } catch (err) {
    //   console.log(err);
    //   console.log("Unsuccesful operation");
    // }
  };

  useEffect(() => {
    callChallengePage();
  }, []);

  return (
    <div>
      <h1>
        LeaderBoard !
      </h1>
    </div>
  );
};

export default Challenge;