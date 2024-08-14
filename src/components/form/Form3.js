import React, { useReducer } from "react";
import useHandleChange from "../hooks/useHandleChange";

const Form3 = () => {
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

  const initialState = {
    nameError: "",
    emailError: "",
  };

  const errorReducer = (state, action) => {
    switch (action.type) {
      case "SET_ERROR_FULLNAME": {
        return { ...state, nameError: action.payload };
      }
      case "SET_ERROR_EMAIL": {
        return { ...state, emailError: action.payload };
      }
      default:
        break;
    }
  };

  // const [nameError, setNameError] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [state, dispatch] = useReducer(errorReducer, initialState);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // values.fullname === ""
    //   ? setNameError("Your fullname is empty")
    //   : setNameError("");
    dispatch({
      type: "SET_ERROR_FULLNAME",
      payload: values.fullname === "" ? "Your fullname is empty" : "",
    });
    // values.email === ""
    //   ? setEmailError("Your email is empty")
    //   : setEmailError("");
    dispatch({
      type: "SET_ERROR_EMAIL",
      payload: values.email === "" ? "Your email is empty" : "",
    });
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
          <div className="text-red-600">{state.nameError}</div>
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <div className="text-red-600">{state.emailError}</div>
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

export default Form3;
