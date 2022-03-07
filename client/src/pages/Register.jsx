import React from "react";
import { useState } from "react";
import FileBase from 'react-file-base64';
import { createPost } from "../actions/index";

const Register = () => { 
  const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: '',cpassword: '' ,selectedFile: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(postData);
  };
    return (
        <>
        <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" type="text" onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <br/>
        <input name="email" placeholder="Email" type="email" label="email"  value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} /><br/>
        <input name="phone" placeholder="Phone" type="number" label="phone"  value={postData.phone} onChange={(e) => setPostData({ ...postData, phone: e.target.value })} /><br/>
        <input name="password" placeholder="Pass" type="password" label="password" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} /><br/>
        <input name="cpassword" placeholder="Cpass" type="password" label="cpassword"  value={postData.cpassword} onChange={(e) => setPostData({ ...postData, cpassword: e.target.value })} /><br/>        
        <div>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <input type="submit" />
      </form>
        </>

    );
};
export default Register;