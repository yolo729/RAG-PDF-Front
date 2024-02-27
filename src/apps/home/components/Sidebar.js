import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div className={`bg-sidebar_back flex flex-col items-start p-4 h-screen`}>
      {/* new chat button */}
      <div
        className={`flex items-center w-full p-1 rounded-lg hover:bg-sidebar_setting_back`}
        onClick={() => setCurrentPage("")}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className={`text-[#ececf1] p-1 h-8 w-8`}>
            <FontAwesomeIcon
              icon={faRecordVinyl}
              fontSize="1.5em"
              className="icon-style"
            />
          </div>
          <h2 className={`text-[#ececf1] font-semibold`}>Chat GPT</h2>
        </div>
      </div>
      <div
        className={`flex items-center w-full p-1 rounded-lg hover:bg-sidebar_setting_back`}
        onClick={() => setCurrentPage("File Upload")}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className={`text-[#ececf1] p-1 h-8 w-8`}>
            <FontAwesomeIcon
              icon={faFileArrowUp}
              fontSize="1.5em"
              className="icon-style"
            />
          </div>
          <h2 className={`text-[#ececf1] font-semibold`}>File Upload</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
