import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data);
      const {name,email,phone,password,cpassword} = data;
      const res = await fetch('/register',{
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name,email,phone,password,cpassword
        })
      });

      const dat = await res.json();
      if(dat.status === '422' || !dat){
        console.log("Registration Failed");
      }
      else{
        console.log("Registration Successful");
        window.alert("Welcome");
      }
    
  };
  // console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name", {})} />
      <br />
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <br />
      <input type="number" placeholder="Phone" {...register("phone", {})} />
      <br />
      <input type="password" placeholder="Password" {...register("password", {})} />
      <br />
      <input type="password" placeholder="Confirm Password" {...register("cpassword", {})} />
      <br />
      <input type="submit" />
    </form>
  );
};

export default Register;
