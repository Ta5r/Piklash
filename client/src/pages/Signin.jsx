import React from 'react';
import { useForm } from 'react-hook-form';
import Profile from './Profile'
// import { Redirect } from 'react-router-dom';
const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data);
      const {email,password} = data;
      const res = await fetch('/signin',{
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,password
        })
      });

      const dat = await res.json();
      if(dat.status === '400' || !dat){
        console.log("Login Failed");
      }
      else{
        console.log("Login Successful");
        console.log(dat.userLogin.name);
        // window.location.href = "/profile";
      }
    
  };
  // console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <br />
     <br />
      <input type="password" placeholder="Password" {...register("password", {})} />
      <br />
      <br />
      <input type="submit" />
    </form>
    // <Profile data={data}></Profile>
  );
};

export default Signin;

