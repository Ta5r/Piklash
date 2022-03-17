import axios from 'axios';
import React from "react";
import { useState } from "react";

const Register = () => {
  const [imgFile, setImgFile] = useState("");

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log("file  :  ");
    console.log(imgFile);
    console.log("File Read");
    const formData = new FormData();
    formData.append("file",imgFile);
    formData.append("upload_preset","qiumfgmg");

    axios.post(
      "https://api.cloudinary.com/v1_1/dfoxozwkm/image/upload",
      formData
      ).then((res)=>{
        console.log(res);
        console.log("URL  =>  ");
        console.log(res.data.url);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit2}>
        <input
          type="file"
          onChange={(event) => {
            setImgFile(event.target.files[0]);
          }}
        />
        <input type="submit" />
      </form>
    </>
  );
};
export default Register;
