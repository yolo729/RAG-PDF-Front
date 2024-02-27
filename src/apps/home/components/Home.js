import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./Sidebar";
import Chat from "../../chat/components/Chat";
import FileUpload from "../../menu/components/FileUpload";
import "../style.css";

import { getAllQueries } from "../apis";
import setAuthHeader from "../../../_helpers/setAuthHeader";
import { AGENT_TITLE } from "../../constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [isCurrentMenuOpen, setIsCurrentMenuOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [activeChat, setActiveChat] = useState({ queries: [] });

  const [questionList, setQuestionList] = useState([]);

  const getQueries = async () => {
    setIsLoading(true);
    await getAllQueries()
      .then((res) => {
        //  console.log(res);
        setQueries(res.data?.chats || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setAuthHeader(sessionStorage.getItem("user"));
    getQueries();
    setCurrentPage("");
  }, []);

  const handleCreateNewChat = () => {
    setActiveChat({ queries: [] });
    setIsMenuOpen && setIsMenuOpen(false);
    setCurrentPage("");
    setQuestionList([]);
  };

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }

  return (
    <>
      {/* <div
        className={`flex flex-row md:hidden p-4 cursor-pointer md:w-[10%] md:h-[10%]`}
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faBars : faXmark}
          size={25}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        ${!isMenuOpen ? "block" : "hidden"}
      </div> */}
      {isMenuOpen ? (
        <div
          className={`overflow-hidden w-[60%] flex flex-col absolute left-0 top-0 h-full min-h-screen transition-all ease-in-out duration-300`}
        >
          <Sidebar
            queries={queries}
            setCurrentPage={setCurrentPage}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
            currentPage={currentPage}
            isCurrentMenuOpen={isCurrentMenuOpen}
            setIsCurrentMenuOpen={setIsCurrentMenuOpen}
            handleCreateNewChat={handleCreateNewChat}
            setIsMenuOpen={setIsMenuOpen}
            questionList={questionList}
            setQuestionList={setQuestionList}
          />
        </div>
      ) : null}
      <div className="md:w-full h-screen flex">
        {/* Left side content */}

        <div className={`hidden md:block  md:w-[40%] lg:w-[20%]`}>
          <Sidebar
            queries={queries}
            setCurrentPage={setCurrentPage}
            setActiveChat={setActiveChat}
            setQueries={setQueries}
            getQueries={getQueries}
            activeChat={activeChat}
            currentPage={currentPage}
            isCurrentMenuOpen={isCurrentMenuOpen}
            setIsCurrentMenuOpen={setIsCurrentMenuOpen}
            handleCreateNewChat={handleCreateNewChat}
            questionList={questionList}
            setQuestionList={setQuestionList}
          />
        </div>

        {/* Right side content */}
        <div className={`w-full md:w-[80%] h-screen md:h-screen bg-chat_back`}>
          {/* <div className="bg-[#f4f4f4] h-screen flex flex-col justify-between mb-2"> */}{" "}
          <div className="flex flex-row justify-between">
            <h1 className={`font-bold text-xl text-[#ececf1] p-4`}>
              {AGENT_TITLE}
            </h1>
            <div className="md:hidden p-4 cursor-pointer">
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                // size={25}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
          <Chat
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            setQueries={setQueries}
            questionList={questionList}
            setQuestionList={setQuestionList}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
