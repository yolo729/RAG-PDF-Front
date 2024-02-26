import React, { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { LLMTempSchema } from "../validations";
import { setLLMTemperature } from "../apis";

const LLMTemperature = ({ setCurrentPage }) => {
  const formik = useFormik({
    initialValues: {
      llmTemp: "",
    },
    validationSchema: LLMTempSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true);
    await setLLMTemperature(values)
      .then((res) => {
        // console.log("Res", res);
        toast.success("LLM Temperature added successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setIsLoading(false);
          setCurrentPage("");
        }, 4000);
      })
      .catch((err) => {
        console.log("error ", err);

        setIsLoading(false);
        toast.error("Something Went wrong!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <>
      {isLoading && <div className="coverSpinner"></div>}
      <section className="menu-section">
        {/* <div className="container"> */}
        <div className="menu-area">
          <div className="flex flex-col align-center">
            <div className="flex cursor-pointer">
              <FontAwesomeIcon
                icon={faXmark}
                size={25}
                onClick={() => setCurrentPage("")}
              />
            </div>
            <h1 align="center" className="title">
              LLM Temperature
            </h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-content-area">
              <div className="form-control">
                <span className="input-error">
                  <label> LLM Temperature </label>
                  {formik.touched.llmTemp && formik.errors.llmTemp ? (
                    <div className="error">{formik.errors.llmTemp}</div>
                  ) : null}
                </span>

                <input
                  type="text"
                  id="llmTemp"
                  name="llmTemp"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.llmTemp}
                  className="input-box"
                  placeholder="Enter temparature"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <button type="submit" className="btn forgot-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "15px",
            }}
          ></div>
        </div>
        <ToastContainer />
        {/* </div> */}
      </section>
    </>
  );
};

export default LLMTemperature;
