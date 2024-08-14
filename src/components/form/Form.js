import React, { useState } from "react";
import useHandleChange from "../hooks/useHandleChange";

const Form = () => {
  // const [fullname, setFullName] = useState("");
  // const [message, setMessage] = useState("");
  // const [country, setCountry] = useState("");
  // const handleInputChange = (event) => {
  //   setFullName(event.target.value);
  // };
  // const handleTextareaChange = (event) => {
  //   setMessage(event.target.value);
  // };
  // const handleSelectChange = (event) => {
  //   setCountry(event.target.value);
  // };
  // const [values, setValues] = useState({
  //   fullname: "",
  //   email: "",
  //   hobby: false,
  // });
  // console.log(values);
  // const handleInputChange = (e) => {
  //   const type = e.target.type;
  //   setValues({
  //     ...values,
  //     [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
  //   });
  //   if (type === "checkbox") {
  //     setValues({
  //       ...values,
  //       [e.target.name]: e.target.checked,
  //     });
  //   } else {
  //     setValues({
  //       ...values,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };
  const { values, handleChange } = useHandleChange({
    fullname: "",
    email: "",
    hobby: false,
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmitForm = (e) => {
    e.preventDefault();
    values.fullname === ""
      ? setNameError("Your fullname is empty")
      : setNameError("");
    values.email === ""
      ? setEmailError("Your email is empty")
      : setEmailError("");
  };
  console.log(values);
  return (
    <div className="p-5">
      <form
        className="flex gap-x-3"
        autoComplete="off"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col">
          <input
            type="text"
            name="fullname"
            className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <div className="text-red-600">{nameError}</div>
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <div className="text-red-600">{emailError}</div>
        </div>
        {/* <input type="checkbox" name="hobby" onChange={handleChange} /> */}
        <button
          type="submit"
          className="p-3 rounded-lg text-white bg-blue-500 h-[65px]"
        >
          Submit
        </button>
      </form>
      {/* {message}
      <textarea
        className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
        placeholder="Enter your message"
        name="message"
        onChange={handleTextareaChange}
      ></textarea>
      {country}
      <select name="country" onChange={handleSelectChange}>
        <option value="vietnam">VN</option>
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
      </select> */}
    </div>
  );
};

export default Form;
