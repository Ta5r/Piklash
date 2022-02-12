import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log("testing contents of img"+data.img[0]);
    // -> object File
    const { name, email, phone, password, cpassword, img } = data;
    const dataghj = new FormData();
    dataghj.append("file", img);
    // console.log("hhhh - "+dataghj);
    // ->object FormData
    // console.log("kn kslklks "+img[0]);
    // -> object File
    // console.log(" v sm "+Object.values(dataghj));
    // -> nothin
    // console.log("kjnsdckj "+dataghj.values()); 
    // ->object iterator
    console.log("img --->  " + data.img[0].name);
    console.log("img --->  " + data.img[0]);
    const myFile = img[0];
    console.log(myFile);
    const testT ="fuck off bitch";
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        myFile,
        testT,
      }),
    });
    const dat = await res.json();
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
      <input
        type="file"
        {...register("img", {})}
      />
      <br />
      <input type="submit" />
    </form>
  );
};

export default Register;
