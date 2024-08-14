import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
// Using react-hook-form

const schemaValidation = Yup.object({
  firstName: Yup.string()
    .required("Please enter your first name")
    .max(10, "Must be 10 characters or less"),
  lastName: Yup.string()
    .required("Please enter your last name")
    .max(10, "Must be 10 characters or less"),
});

const SignUpFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  // console.log("🚀 ~ SignUpFormHook ~ dirtyFields:", dirtyFields);
  // console.log("🚀 ~ SignUpFormHook ~ isDirty:", isDirty);
  // console.log("🚀 ~ SignUpFormHook ~ isValid:", isValid);
  // console.log("🚀 ~ SignUpFormHook ~ isSubmitting:", isSubmitting);
  // console.log("🚀 ~ SignUpFormHook ~ errors:", errors);
  const onSubmit = async (values) => {
    if (isValid) {
      console.log("send data to backend");
    }
    // const response = await axios.get(
    //   "https://hn.algolia.com/api/v1/search?query=react"
    // );
    // return response.data;
    // return new Promise((resolver) => {
    //   setTimeout(() => {
    //     resolver();
    //     console.log(values);
    //   }, 5000);
    // });
  };
  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 w-full max-w-[500px] mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firtName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="p-4 rounded-lg border border-lg shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
          {...register("firstName")}
          // {...register("firstName", {
          //   required: true,
          //   maxLength: 10,
          // })}
        />
        {errors?.firstName && (
          <div className="text-red-500 text-sm">
          {errors?.firstName?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          className="p-4 rounded-lg border border-lg shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
          {...register("lastName")}
          // {...register("lastName", {
          //   required: true,
          //   maxLength: 10,
          // })}
        />
        {errors?.lastName && (
          <div className="text-red-500 text-sm">
            {errors?.lastName?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          className="p-4 rounded-lg border border-lg shadow-[0px_0px_0px_2px_rgba(125,_106,_255,_0.5)]"
          {...register("email")}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 mx-auto border-2 border-white border-t-4 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUpFormHook;
