import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { generateChat } from "../apis";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../style.css";
import { useSelector } from "react-redux";

function Chat({
  activeChat,
  setActiveChat,
  setQueries,
  questionList,
  setQuestionList,
}) {
  const theme = useSelector((store) => store.setting.isDark);

  const activeModel = useSelector((store) => store.auth.activeModel);
  const [question, setQuestion] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);

  const handleSendMessage = async () => {
    // e.preventDefault();
    setQuestionList([...questionList, question]);

    if (!question) {
      return;
    }
    let payload = {
      question: question,
      modelId: activeModel,
    };

    if (!activeChat.id) {
      const splitQues = question.split(" ");

      payload.isNew = true;
      payload.title =
        splitQues[0] + " " + (splitQues[1] || "") + " " + (splitQues[2] || "");
    } else {
      payload.id = activeChat.id;
    }
    setIsLoading(true);
    setQuestion("");
    await generateChat(payload)
      .then((res) => {
        setQueries(res.data.chats);

        const oldActiveChat = res.data.chats.find(
          (chat) => chat.id === activeChat.id
        );
        const chat = oldActiveChat
          ? oldActiveChat
          : res.data.chats[res.data.chats.length - 1];
        // console.log("chat ", chat);
        setActiveChat(chat);
        // setQuestion("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        toast(
          "You have some invalid prompts, please remove files uploaded last from your local DB",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setIsLoading(false);
      });
  };

  // useEffect(() => {}, [question]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.queries.length]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // console.log("Enter key pressed ✅");
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-between mb-2">
        <div>
          {/* <h1 className="font-bold text-xl text-black p-4">Agent Query</h1> */}
          <div
            className={`${
              (questionList.length > 0 || activeChat.queries.length > 0) &&
              (theme === true ? "bg-chat_back text-white" : "bg-gray-100")
            } rounded overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col`}
          >
            {questionList.length === 0 ? (
              <div
                className={`text-xl font-bold flex justify-center ${
                  theme === true ? "text-[#ececf1]" : "text-black"
                }`}
              >
                How can I help today?
              </div>
            ) : (
              <></>
            )}

            {questionList.length > 0 &&
              questionList.map((m, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 my-6 p-2"
                >
                  <div className="flex flex-col items-start">
                    <p className="text-gray font-bold">{m && "You"}</p>
                    <p
                      className={`${
                        theme === true ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {m}
                    </p>

                    <p
                      className={`${
                        theme === true ? "text-gray-300" : "text-black"
                      } font-bold`}
                    >
                      {m && "Answer"}
                    </p>
                    {isLoading && questionList.length - 1 === index && (
                      <p
                        className={`${
                          theme === true ? "text-gray-300" : "text-black"
                        } text-sm animate-pulse text-center`}
                      >
                        Loading...
                      </p>
                    )}
                    {activeChat.queries.map((ans, index) => (
                      <p
                        key={index}
                        className={`${
                          theme === true ? "text-gray-300" : "text-black"
                        }`}
                      >
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {m === ans.question && ans.solution}
                        </Markdown>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            {/* {questionList.length > 0
              ? questionList.map((m, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 my-6 p-2"
                  >
                    <div className="flex flex-col items-start">
                      <p className="text-gray font-bold">{m && "You"}</p>
                      <p className="text-black">{m}</p>

                      <p className="text-gray font-bold">{m && "Answer"}</p>
                      {activeChat.queries.map((ans) => (
                        <p className="text-black">
                          {m === ans.question && ans.solution}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              : activeChat.queries.map((m, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 my-6 p-2"
                  >
                    <div className="flex flex-col items-start">
                      <p className="text-gray font-bold">
                        {m.question && "You"}
                      </p>
                      <p className="text-black">{m.question}</p>

                      <p className="text-gray font-bold">
                        {m.solution && "Answer"}
                      </p>
                      <p className="text-black">{m.solution}</p>
                    </div>
                  </div>
                ))} */}
            <div ref={bottomRef} />
          </div>
        </div>
        {/* {isLoading && (
          <p className="text-black text-sm animate-pulse text-center">
            Loading...
          </p>
        )} */}
        <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
          <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
            <input
              value={question}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`${
                theme === true ? "text-gray-300" : "text-black"
              } h-full w-full p-2 outline-none bg-inherit`}
              type="text"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="h-full p-2 rounded-lg icon-style text-[#ececf1]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          <p className="text-xs text-white p-2 text-center"></p>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Chat;
