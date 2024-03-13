import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import { getAllFiles, retrainAllModels } from "../apis";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const fileRef = useRef();
  const theme = useSelector((store) => store.setting.isDark);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, setPER_PAGE] = useState(10);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(files.length / PER_PAGE);

  useEffect(() => {
    handleGetAllFiles();
  }, []);

  const handleGetAllFiles = async () => {
    try {
      setIsLoading(true);
      const res = await getAllFiles();
      console.log("files-------", res.data);
      setFiles(res.data.files);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
    }
  };

  const handleRetrainModel = async () => {
    try {
      setIsLoading(true);
      const res = await retrainAllModels(files);
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
          }}
        >
          <button
            className={` ${
              theme === true
                ? "bg-white text-black hover:bg-gray-300"
                : "bg-black text-white"
            }  p-2 text-base font-bold rounded cursor-pointer`}
            onClick={handleRetrainModel}
          >
            Retrain
          </button>
        </div>
      </div>
      {files.length ? (
        <>
          <table id="filesTable">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {files.slice(offset, offset + PER_PAGE).map((file, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1 + offset}</th>
                  <td>{file}</td>
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
