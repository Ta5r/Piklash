import React from "react";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { name, email, phone, password, cpassword, img } = data;
    const myFile = img[0];
    console.log(myFile);
    const imgFD = new FormData();
    imgFD.append("img",myFile);
    const res = await axios.post("/register", {
        name,
        email,
        phone,
        password,
        cpassword,
        imgFD
    });

    console.log("qwerty1");
    console.log("qwerty"+res);
    console.log(JSON.stringify(res));

    const dat = await res.json();
    console.log("data dat : "+dat);
    if (dat.status === "422" || !dat) {
      console.log("Registration Failed");
    } else {
      console.log("Registration Successful");
      window.alert("Welcome");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name", {})} />
      <br />
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <br />
      <input type="number" placeholder="Phone" {...register("phone", {})} />
      <br />
      <input
        type="password"
        placeholder="Password"
        {...register("password", {})}
      />
      <br />
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("cpassword", {})}
      />
      <br />
      <input type="file" {...register("img", {})} />
      <br />
      <input type="submit" />
    </form>
  );
};

export default Register;
