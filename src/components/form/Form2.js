import React, { useState } from "react";

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
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    hobby: false,
  });
  console.log(values);
  const handleInputChange = (e) => {
    const type = e.target.type;
    setValues({
      ...values,
      [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
    });
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
  };
  return (
    <div className="p-5">
      <div className="flex gap-x-3">
        <input
          type="text"
          name="fullname"
          className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
          placeholder="Enter your email address"
          onChange={handleInputChange}
        />
        <input type="checkbox" name="hobby" onChange={handleInputChange} />
      </div>
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
