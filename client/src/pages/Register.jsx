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
    // console.log(data);
    // console.log("testing contents of img"+data.img[0]);
    // -> object File
    const { name, email, phone, password, cpassword, img } = data;
    // const dataghj = new FormData();
    // dataghj.append("file", img);
    // console.log("img --->  " + data.img[0].name);
    // console.log("img --->  " + data.img[0]);
    const myFile = img[0];
    console.log(myFile);
    // console.log(myFile.name);
    const testT = "test string";
    

    const imgFD = new FormData();
    imgFD.append("img",myFile);

    // console.log("IMG Form Data -- > "+imgFD);
    // const myFilename = myFile.name;
    
    // console.log("imgFD.length -> "+imgFD.length);
    // var object = {};
    // imgFD.forEach(function(value, key){
    //     object[key] = value;
    // });
    // var json2 = JSON.stringify(object);
    // console.log("JSON 2"+json2);
    
    // Or ES6 arrow function
    // var object2 = {};
    // imgFD.forEach((value, key) => object[key] = value);
    // var json = JSON.stringify(object2);
    
    // console.log("json ->"+json);


    // console.log("qwerty0");


    // const res = await fetch("/testRoute", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     phone,
    //     password,
    //     cpassword,
    //     myFile,
    //     testT,
    //   }),
    // });
    
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
