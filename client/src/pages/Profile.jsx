import React, { useEffect, useState } from "react";

const Profile = () => {

  const [name, setName] = useState('TestName');  
  const [email, setEmail] = useState('Test@Test.test');  
  const [phone, setPhone] = useState('999999999');  
  const [img, setImg] = useState('img_not_found');  
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
      setImg(data.selectedFile);
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
      <h3>User Image</h3>
      <img src={img} height="100px" alt="usr_img"/>
      <h3>Account Info</h3>
      <p>Name - {name}</p>
      <p>Phone - {phone}</p>
      <p>Email - {email}</p>
    </div>
  );
};

export default Profile;