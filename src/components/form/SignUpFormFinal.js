import React from "react";
import { Form, Formik } from "formik";
import { MyCheckBox, MyInput, MySelectBox, MyTextArea } from "./Field";
import * as Yup from "yup";

const SignUpFormFinal = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        intro: "",
        job: "",
        term: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(10, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email().required("Required"),
        intro: Yup.string().required("Required"),
        job: Yup.string().required("Required"),
        term: Yup.boolean().oneOf(
          [true],
          "Please check the terms and conditions"
        ),
      })}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.resetForm({
            firstName: "",
            lastName: "",
            email: "",
            intro: "",
            job: "",
            term: false,
          });
          actions.setSubmitting(false);
        }, 5000);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="p-10 w-full max-w-[500px] mx-auto">
          <MyInput
            label="First name"
            name="firstName"
            placeholder="Enter your first name"
            id="firstName"
          ></MyInput>
          <MyInput
            label="Last name"
            name="lastName"
            placeholder="Enter your last name"
            id="lastName"
          ></MyInput>
          <MyInput
            label="Email Address"
            name="email"
            placeholder="Enter your email address"
            id="email"
            type="email"
          ></MyInput>
          <MyTextArea
            label="Introduce"
            name="intro"
            placeholder="Enter your introduce"
            id="intro"
          ></MyTextArea>
          <MySelectBox name="job" label="Select your job">
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Fullstack Developer</option>
          </MySelectBox>
          <MyCheckBox name="term">
            <p>I accept the terms and conditions</p>
          </MyCheckBox>
          <div>
            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// useField
// const MyInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className="flex flex-col gap-2 mb-5">
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input
//         type="text"
//         className="p-4 rounded-lg border shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
//         {...field}
//         {...props}
//       />
//       {meta.touched && meta.error ? (
//         <div className="text-sm text-red-500">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };
// const MyTextArea = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className="flex flex-col gap-2 mb-5">
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <textarea
//         type="text"
//         className="h-[150px] resize-none p-4 rounded-lg border shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
//         {...field}
//         {...props}
//       />
//       {meta.touched && meta.error ? (
//         <div className="text-sm text-red-500">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };
// const MySelectBox = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className="flex flex-col gap-2 mb-5">
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select
//         className="p-4 rounded-lg border shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
//         {...field}
//         {...props}
//       />
//       {meta.touched && meta.error ? (
//         <div className="text-sm text-red-500">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };
// const MyCheckBox = ({ children, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className="flex flex-col gap-2 mb-5">
//       <label className="flex items-center gap-2">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="text-sm text-red-500">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

export default SignUpFormFinal;
