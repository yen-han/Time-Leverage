import React from "react";
import { useAuth } from "@/Authentication/AuthContext";
import { useRouter } from "next/router";
const Login = () => {
  const { logIn }: any = useAuth();
  const router = useRouter();
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);
    try {
      await logIn(formDataObj.email, formDataObj.password);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
        Login
      </h2>

      <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="***"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          style={{ display: "flex", margin: "auto" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
