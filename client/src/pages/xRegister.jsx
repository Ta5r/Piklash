// import React from "react";
// import { useForm } from "react-hook-form";
// import FileBase from 'react-file-base64';
// const axios = require("axios").default;

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const { name, email, phone, password, cpassword, img } = data;
    
//     const formData = new FormData();
//     formData.append("name",name);
//     formData.append("email",email);
//     formData.append("phone",phone);
//     formData.append("password",password);
//     formData.append("cpassword",cpassword);

//     console.log("img --->  " + data.img[0].name);
//     console.log(img[0]);
//     const myFile = img[0];
//     console.log(myFile.name);    
//     const myFilename = myFile.name;
//     console.log("kjnjkssd "+myFilename);
//     console.log("frmData --> "+formData.getAll(name));
//     const res = await axios.post("/register", {
//         name,
//         email,
//         phone,
//         password,
//         cpassword
//     }).then( async res => {
//     const dat = await JSON.stringify(res);
//     if (dat.status === "422" || !dat) {
//       console.log("Registration Failed");
//     } else {
//       console.log("Registration Successful");
//       console.log("Welcome");
//     }
//     });
    // axios({
    //   method:  "post",
    //   url: "register",
    //   data: formData,
    //   headers: { "Content-Type":"multipart/form-data"},
    //   }).then(function (response){
    //     console.log(response)
    //   }).catch(function (response){
    //     console.log(response);
    //   });
  // };
  // return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input type="text" placeholder="Name" {...register("name", {})} />
    //   <br />
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
    //   />
    //   <br />
    //   <input type="number" placeholder="Phone" {...register("phone", {})} />
    //   <br />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     {...register("password", {})}
    //   />
    //   <br />
    //   <input
    //     type="password"
    //     placeholder="Confirm Password"
    //     {...register("cpassword", {})}
    //   />
    //   <br />
    //   {/* <div> */}
    //   {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> */}
    //   {/* </div> */}
    //   {/* <input type="file" {...register("img", {})} /> */}
    //   {/* <br /> */}
    //   <input type="submit" />
    // </form>
    
    // <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    //     <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
    //     <TextField name="creator" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
    //     <TextField name="title" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
    //     <TextField name="message" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
    //     <TextField name="tags" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        
    //     <div className={classes.fileInput}>
    //       <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
    //     </div>
        
    //     <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    //     <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    //   </form>
  // );
// };

// export default Register;
