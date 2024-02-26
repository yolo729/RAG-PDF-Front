import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { GPTSchema } from "../validations";
import { setGPT, getUserGPT } from "../apis";

const UpgradeGPT = ({ setCurrentPage }) => {
  const formik = useFormik({
    initialValues: {
      gpt: "",
    },
    // validationSchema: GPTSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetGPT();
  }, []);

  const handleGetGPT = async () => {
    try {
      const res = await getUserGPT();
      formik.setFieldValue("gpt", res.data?.gpt);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    await setGPT(values)
      .then((res) => {
        // console.log("Res", res);
        toast.success("GPT added successfully!", {
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
                // size={25}
                onClick={() => setCurrentPage("")}
              />
            </div>
            <h1 align="center" className="title">
              GPT
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-content-area">
              <div className="form-control">
                <span className="input-error">
                  {/* <label>Prompt </label> */}
                  {formik.touched.prompt && formik.errors.prompt ? (
                    <div className="error">{formik.errors.prompt}</div>
                  ) : null}
                </span>

                <input
                  type="text"
                  id="gpt"
                  name="gpt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gpt}
                  className="input-box"
                  placeholder="Enter GPT name"
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
        {/* </div> */}
        <ToastContainer />
      </section>
    </>
  );
};

export default UpgradeGPT;
