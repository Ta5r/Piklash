import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../actions/index";

const Register = () => {
  const navigate = useNavigate();
  const [post_url, setPostUrl] = useState("");
  const [is_disabled, setIS_Disabled] = useState(true);
  const [imgFile, setImgFile] = useState();
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    selectedFile: "",
  });

  useEffect(()=>{
    setIS_Disabled(false);
    console.log("frm effect");
    console.log(postData['selectedFile']);
    if (postData["selectedFile"]) {
      createPost(postData);
      console.log("Done :)");
    } else {
      console.log("Operation Taking Time ...");
    }
  },[postData['selectedFile']]);

  const uploadImg = (val) => {
    console.log("onchange ... ");
    console.log("val => ");
    console.log(val);
    setImgFile(val);
    console.log("imgFile => ");
    console.log(imgFile);
    setIS_Disabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", "qiumfgmg");

    console.log("inside Handle Submit");
    console.log(imgFile);

    const cloudinary_res = await axios.post(
      "https://api.cloudinary.com/v1_1/dfoxozwkm/image/upload",
      formData
    );
    console.log("Cloudinary URL : " + cloudinary_res.data.url);
    console.log("Post_URL : " + post_url);

    setPostData({ ...postData, selectedFile: cloudinary_res.data.url });
    setPostUrl(cloudinary_res.data.url);

    console.log("postData : " + postData);
    console.log(postData);
    setPostData({ ...postData, selectedFile: cloudinary_res.data.url });

    // if (postData["selectedFile"]) {
    //   createPost(postData);
    // } else {
    //   console.log("Operation Taking Time ...");
    // }
    // navigate("/login");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          label="email"
          value={postData.email}
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
        />
        <br />
        <input
          name="phone"
          placeholder="Phone"
          type="number"
          label="phone"
          value={postData.phone}
          onChange={(e) => setPostData({ ...postData, phone: e.target.value })}
        />
        <br />
        <input
          name="password"
          placeholder="Pass"
          type="password"
          label="password"
          value={postData.password}
          onChange={(e) =>
            setPostData({ ...postData, password: e.target.value })
          }
        />
        <br />
        <input
          name="cpassword"
          placeholder="Cpass"
          type="password"
          label="cpassword"
          value={postData.cpassword}
          onChange={(e) =>
            setPostData({ ...postData, cpassword: e.target.value })
          }
        />
        <br />
        <input
          type="file"
          onChange={(event) => {
            // setImgFile(event.target.files[0]);
            uploadImg(event.target.files[0]);
          }}
        />
        <input type="submit" disabled={is_disabled} />
      </form>
      <a href={post_url} target="_blank" rel="noreferrer">
        Click to Check
      </a>
    </>
  );
};
export default Register;
