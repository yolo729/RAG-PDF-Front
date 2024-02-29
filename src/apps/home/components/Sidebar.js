import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faGear,
  faUser,
  faArrowRightFromBracket,
  faKey,
  faTemperatureThreeQuarters,
  faAngleDown,
  faAngleUp,
  faLock,
  faFileArrowUp,
  faPalette,
  faComment,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { logout, setTheme } from "../../auth/actions";
import { deleteChat } from "../../chat/apis";

const leftMenuItems = [
  {
    title: "Profile",
    icon: faUser,
  },
  {
    title: "Change Password",
    icon: faLock,
  },

  {
    title: "File Upload",
    icon: faFileArrowUp,
  },

  {
    title: "Theme Mode",
    icon: faPalette,
  },

  {
    title: "Logout",
    icon: faArrowRightFromBracket,
  },
];

const Sidebar = ({
  queries,
  setCurrentPage,
  setActiveChat,
  setQueries,
  getQueries,
  activeChat,
  handleCreateNewChat,
  setIsMenuOpen,
  setQuestionList,
  questionList,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const theme = useSelector((store) => store.setting.isDark);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  // console.log(queries);
  const handleDeleteChat = async (id) => {
    try {
      const res = await deleteChat(id);
      setQueries(res.data.chats);
      setActiveChat({ queries: [] });
      setQuestionList([]);
    } catch (e) {}
  };

  const handleChangeTheme = () => {
    dispatch(setTheme(!theme));
    sessionStorage.setItem("dark", !theme);
  };

  useEffect(() => {
    const session_theme = sessionStorage.getItem("dark");
    if (session_theme === "false" || session_theme === false) {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
  }, []);

  return (
    <div
      className={`${
        theme === true ? `bg-sidebar_back ` : `bg-gray-50`
      } flex flex-col items-start p-4 h-screen`}
    >
      {/* new chat button */}
      <div
        className={`flex items-center w-full p-1 rounded-lg ${
          theme === true ? "hover:bg-sidebar_setting_back" : "hover:bg-gray-100"
        } `}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <div
            className={`${
              theme === true ? `text-[#ececf1] ` : `text-black`
            } p-1 h-8 w-8`}
          >
            <FontAwesomeIcon
              icon={faRecordVinyl}
              fontSize="1.5em"
              className="icon-style"
            />
          </div>
          <h2
            onClick={handleCreateNewChat}
            className={`${
              theme === true ? `text-[#ececf1] ` : `text-black`
            } font-semibold`}
          >
            New Chat
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        {/* recent chats title */}

        <div>
          <p className="text-[#666666] text-sm mt-1">Today</p>
          <div className="text-[#fff] text-sm space-y-4 mt-4 w-full overflow-y-scroll h-[70vh]">
            {queries.length !== 0 &&
              queries.map((q, index) => (
                <div
                  key={index}
                  className={`${
                    q.id === activeChat.id && theme === true
                      ? "bg-[#434b49] "
                      : q.id === activeChat.id && theme === false
                      ? "inherit hover:bg-gray-100"
                      : q.id !== activeChat.id && theme === true
                      ? "inherit hover:bg-[#434b49]"
                      : "inherit hover:bg-gray-100"
                  } flex justify-around rounded p-1 pointer `}
                >
                  <div
                    // style={{
                    //   backgroundColor:
                    //     q.id === activeChat.id ? "#434b49" : "inherit",
                    // }}
                    key={index}
                    onClick={() => {
                      setActiveChat(q);
                      setCurrentPage("");
                      setQuestionList([]);
                      const question = q.queries.map((q) => q.question);
                      setQuestionList(question);
                      setIsMenuOpen && setIsMenuOpen(false);
                    }}
                    className={`px-2 py-2 truncate w-full rounded-lg cursor-pointer ${
                      theme === true ? "inherit " : "text-black"
                    }`}
                  >
                    {q.title}
                  </div>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDeleteChat(q.id)}
                  >
                    <img
                      src={`${
                        theme === true
                          ? "/images/delete.png"
                          : "/images/bin.png"
                      }`}
                      alt="delete"
                      className="w-5 h-5 rounded-full"
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* left side bottom menu */}
        <div className="flex flex-col space-y-4 relative">
          {isOpen && (
            <div
              className={`absolute bottom-10 w-full ${
                theme === true ? "bg-sidebar_setting_back" : "bg-gray-100"
              }  origin-top-right rounded-md `}
            >
              {leftMenuItems.map((item, i) => (
                <div
                  className={`py-2 rounded-md w-full ${
                    theme === true
                      ? "hover:bg-sidebar_hover"
                      : "hover:bg-gray-200"
                  }`}
                  key={i}
                >
                  <div
                    className={`block px-3 py-2 mt-2 ${
                      theme === true ? "text-[#fff]" : "text-black"
                    } text-sm font-semibold rounded-lg md:mt-0  focus:outline-none focus:shadow-outline`}
                  >
                    {item.title === "Logout" ? (
                      <div
                        className={`cursor-pointer }`}
                        onClick={() => {
                          dispatch(logout);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          fontSize="1em"
                          className="icon-style px-3 "
                        />
                        {item.title}
                      </div>
                    ) : item.title === "Theme Mode" ? (
                      <div className="cursor-pointer flex">
                        <FontAwesomeIcon
                          icon={item.icon}
                          fontSize="1em"
                          className="icon-style px-3 "
                        />
                        {item.title}
                        {
                          <label
                            htmlFor="toggle-example"
                            className="flex items-center cursor-pointer relative ml-4 mb-0"
                          >
                            <input
                              type="checkbox"
                              id="toggle-example"
                              className="sr-only"
                              onChange={handleChangeTheme}
                            />
                            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                          </label>
                        }
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer flex"
                        onClick={() => {
                          setCurrentPage(item.title);
                          setIsMenuOpen && setIsMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          fontSize="1em"
                          className="icon-style px-3 "
                        />
                        {item.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* user account details */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center w-full p-2 rounded-lg ${
              theme === true
                ? "hover:bg-sidebar_setting_back"
                : "hover:bg-gray-100"
            } cursor-pointer`}
          >
            <img
              src="/images/default_user.jpg"
              alt="account"
              className="w-8 h-8 rounded-full"
            />
            <p
              className={`${
                theme === true ? "text-[#fff]" : "text-black"
              }  h-8 p-1`}
            >
              {user.firstName +
                " " +
                (user.lastName == undefined ? "" : user.lastName)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
