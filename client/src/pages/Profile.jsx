import React, { useEffect, useState } from "react";

const Profile = () => {

  const [name, setName] = useState('TestName');  
  const [email, setEmail] = useState('Test@Test.test');  
  const [phone, setPhone] = useState('999999999');  
  const callProfilePage = async () => {
    try {
      let data = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      data = await data.json();
      console.log(data);      
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
   
       if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      console.log("Unsuccesful operation");
    }
  };

  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name - {name}</p>
      <p>Phone - {phone}</p>
      <p>Email - {email}</p>
    </div>
  );
};

export default Profile;