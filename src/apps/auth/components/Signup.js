import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as CryptoJS from "crypto-js";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import swal from 'sweetalert'

import { signupSchema } from "../validations";
import { register, setActiveModel, verifyEmail, setTheme } from "../actions";

import "../style.css";
import { EMAIL_VERIFY_MSG, EMAIL_VERIFY, EMAIL_EXIST_MSG } from "../constants";

const Signup = () => {
  const dispatch = useDispatch();
  const [queryParam] = useSearchParams();

  useEffect(() => {
    console.log("size-----------", queryParam);
    if (queryParam.size > 0) {
      const etoken = queryParam.get("etoken");
      const ptoken = queryParam.get("ptoken");
      const e_string = etoken
        .toString()
        .replace("xMl3Jk", "+")
        .replace("Por21Ld", "/")
        .replace("Ml32", "=");
      const p_string = ptoken
        .toString()
        .replace("xMl3Jk", "+")
        .replace("Por21Ld", "/")
        .replace("Ml32", "=");
      dispatch(verifyEmail({ e_string, p_string }));
      // const bytes = CryptoJS.AES.decrypt(
      //   token,
      //   process.env.REACT_APP_MAIL_SECRET_KEY
      // );
      // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    }
  }, [queryParam]);

  const [isLoading, changeIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile_no: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { messages, error, isAuthenticated, errorType } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (values) => {
    changeIsLoading(true);
    try {
      const response = dispatch(register(values));
      dispatch(setActiveModel("gpt"));
      changeIsLoading(false);
    } catch (e) {
      console.log("error ", e.message);
      changeIsLoading(false);
    }
  };

  const theme = useSelector((store) => store.setting.isDark);
  const session_theme = sessionStorage.getItem("dark");

  useEffect(() => {
    if (session_theme === "false" || session_theme === false) {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
    if (error) {
      console.log("errors ", error);
      // dispatch({ type: "clearError" });
      changeIsLoading(false);
      if (errorType === EMAIL_VERIFY) {
        toast.success(EMAIL_VERIFY_MSG, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    if (isAuthenticated) {
      // alert(message);
      changeIsLoading(false);
    }
  }, [error, isAuthenticated, messages]);

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }

  return (
    <section
      className={`form-section ${theme === true ? "bg-chat_back" : "bg-white"}`}
    >
      <div className="container">
        <div className="login-area">
          <h1 align="center" className="title">
            Signup
          </h1>
          <div className="form-area">
            <form onSubmit={formik.handleSubmit}>
              <div className="signupForm">
                <div className="form-control">
                  <span>
                    <label htmlFor="firstName">First Name</label>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="input-box"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="lastName">Last Name</label>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="input-box"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="form-control">
                <span>
                  <label htmlFor="email">Email</label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input-box"
                  placeholder="Enter Email"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="mobile_no">Contact</label>
                  {formik.touched.mobile_no && formik.errors.mobile_no ? (
                    <div className="error">{formik.errors.mobile_no}</div>
                  ) : null}
                </span>
                <input
                  type="text"
                  id="mobile_no"
                  name="mobile_no"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile_no}
                  className="input-box"
                  placeholder="Enter Contact"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="password">Password</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input-box"
                  placeholder="Create Password"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="input-box"
                  placeholder="Confirm Password"
                />
              </div>

              <button type="submit" align="center" className="btn submit-btn">
                Submit
              </button>
            </form>
            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "15px",
              }}
            >
              Already have an account? &nbsp;
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signup;
