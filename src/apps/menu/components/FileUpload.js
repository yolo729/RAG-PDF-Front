import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllFiles,
  retrainModel,
  uploadFile,
  deleteModel,
  setActiveModelApi,
  retrainAllModels,
  getActiveModelApi,
} from "../apis";
import { setActiveModel } from "../../auth/actions";
import { useDispatch, useSelector } from "react-redux";

const FileUpload = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const activeModel = useSelector((store) => store.auth.activeModel);
  const theme = useSelector((store) => store.setting.isDark);
  // console.log(activeModel);
  const [files, setFiles] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrained, setIsRetrained] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, setPER_PAGE] = useState(6);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(files.length / PER_PAGE);

  useEffect(() => {
    handleGetAllFiles();
  }, []);

  const handleGetActiveModel = () => {
    try {
      const res = getActiveModelApi();

      dispatch(setActiveModel(res.activeModel));
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleGetAllFiles = async () => {
    try {
      const res = await getAllFiles();

      // setIsRetrained(true);

      res.data.files.length &&
        res.data.files.map((file) =>
          !file.retrained ? setIsRetrained(false) : setIsRetrained(true)
        );

      setFiles(res.data.files);
      setModels(res.data.models);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
    }
  };

  const handleDropdownChange = (event) => {
    if (event.target.value !== "no") {
      setSelectedValue(event.target.value);
      handlesetActiveModel(event.target.value);
    }
  };

  const handleUploadFile = async ({ currentTarget: input }) => {
    setIsLoading(true);
    setIsRetrained(false);
    try {
      console.log("file upload--------------", input.files);
      const res = await uploadFile(input.files);
      handleGetAllFiles();
      fileRef.current.value = null;
      toast.success("Upload successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
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
      console.log(e.message);
    }
  };

  const handleRetrainModel = async () => {
    setIsLoading(true);
    // const filesToRetrained = [];
    // console.log("retrain ", isRetrained);
    // setIsRetrained(true);
    setIsDelete(false);
    // files.forEach((file) => !file.retrained && filesToRetrained.push(file));
    try {
      const res = await retrainModel(files);
      // console.log("res retrain  ", res.data);
      handleGetAllFiles();
      toast.success("Model retrained successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
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
      console.log(e.message);
    }
  };

  const handleRetrainAllModels = async () => {
    setIsLoading(true);
    try {
      const res = await retrainAllModels(files);
      // console.log("res all models", res.data.files);
      setFiles(res.data.files);
      handleGetAllFiles();
      setIsRetrained(true);

      toast.success("All models retrained successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setIsLoading(false);
    } catch (e) {
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
      console.log(e.message);
    }
  };

  const handleDeleteFile = async (id, path) => {
    setIsLoading(true);
    setIsDelete(true);
    try {
      const res = await deleteModel({ id, path });
      handleGetAllFiles();
      fileRef.current.value = null;
      // await retrainModel(files);
      toast.success("File deleted successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
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
      console.log(e.message);
    }
  };

  const handlesetActiveModel = async (id) => {
    try {
      const res = await setActiveModelApi(id);
      // console.log("res all active model ", res.data);
      dispatch(setActiveModel(id));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="aroundFileUploadTable">
      {isLoading && <div className="coverSpinner"></div>}
      <div className="firstSection">
        <div
          className={`font-bold text-xl ${
            theme === true ? "text-gray-100" : "text-black"
          }  p-2`}
        >
          All files
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",

            alignItems: "baseline",
            // justifyContent: "flex-end",
            // width: "12%",
          }}
        >
          <>
            <label
              className={` ${
                theme === true
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white"
              }  p-2 text-base font-bold rounded cursor-pointer`}
              htmlFor="customFile"
            >
              Upload new file
            </label>
            <input
              ref={fileRef}
              multiple
              type="file"
              onChange={handleUploadFile}
              id="customFile"
              style={{ visibility: "hidden", height: "0px", width: "0px" }}
              accept=".pdf, .txt, .md"
            />
          </>
          {files.length > 0 && (
            <div
              style={{
                display: "flex",
                // flexDirection: "row",
                // justifyContent: "end",
                // alignItems: "flex-end",
                marginTop: "4px",
              }}
            >
              {isRetrained && !isDelete ? (
                <>
                  <select
                    id="dropdown"
                    className="w-30 border-2 border-black-900 p-2 rounded-lg mr-1 cursor-pointer"
                    value={activeModel}
                    onChange={handleDropdownChange}
                  >
                    <option value="no">Select Version</option>
                    {models.map((model) => (
                      <option
                        value={model}
                        key={model}
                      >{`Model V${model}`}</option>
                    ))}
                  </select>
                </>
              ) : (
                <button
                  className={` ${
                    theme === true
                      ? "bg-white text-black hover:bg-gray-300"
                      : "bg-black text-white"
                  }  px-4  py-2 font-bold text-base rounded  mr-2`}
                  disabled={files.length ? false : true}
                  onClick={handleRetrainModel}
                >
                  Retrain
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {files.length ? (
        <>
          <table id="filesTable">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.slice(offset, offset + PER_PAGE).map((file) => (
                <tr key={file.id}>
                  <th scope="row">{file.id}</th>
                  <td>{file.title}</td>
                  <td className="btn-container">
                    {/* <span>
                    {file.retrained ? (
                      "Retrained"
                    ) : (
                      <button
                        onClick={() => handleRetrainModel(file)}
                        align="center"
                        className="retrainButton"
                      >
                        Retrain model
                      </button>
                    )}
                  </span> */}
                    <span>
                      <button
                        onClick={() => handleDeleteFile(file.id, file.path)}
                        align="center"
                        className="deleteButton"
                      >
                        Delete
                      </button>
                    </span>
                    {/* {file.retrained && (
                    <span>
                      <button
                        onClick={() => {
                          console.log(file.id);
                          file.id !== activeModel &&
                            handlesetActiveModel(file.id);
                        }}
                        align="center"
                        className={`${
                          file.id === activeModel
                            ? "active-btn"
                            : "notActiveButton"
                        }`}
                      >
                        {file.id === activeModel ? "Active" : "Activate Model"}
                      </button>
                    </span>
                  )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="tableFooter">
            {/* <div>
              Show -{" "}
              <select
                className="show-number"
                onChange={(e) => setPER_PAGE(e.target.value)}
              >
                <option defaultValue>3</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
            </div> */}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              disabledClassName={"page-item"}
              activeClassName={"page-item active"}
              activeLinkClassName="page-link"
            />
          </div>
        </>
      ) : (
        <div className="noRecordFound">
          <h2 className={`${theme === true ? "text-gray-100" : "text-black"}`}>
            No record found
          </h2>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
