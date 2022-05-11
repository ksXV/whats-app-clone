import * as React from "react";

import InputBox from "../input-box/input-box.component";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

interface CSBProps extends React.HTMLAttributes<HTMLElement> {
  addFriendBox: boolean;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

const CustomSearchBox: React.FC<CSBProps> = ({ addFriendBox, onChange }) => {
  return addFriendBox ? (
    <div className="flex flex-row pl-2 border-2 py-1 border-gray-800 rounded-lg w-[100%] bg-input-color">
      <AiOutlineArrowLeft
        className="cursor-pointer unselectable-text"
        size={"30"}
      />
      <InputBox
        id="filter-input"
        onChange={onChange}
        className="bg-input-color pb-[1px] focus-visible:outline-none w-[100%]"
        type="text"
        placeholder="search a user to add"
        required={false}
      />
    </div>
  ) : (
    <div className="flex flex-row pl-2 border-2 py-1 border-gray-800 rounded-lg w-[100%] bg-input-color">
      <BiSearch
        size={"28"}
        className="mr-1 cursor-pointer transform hover:scale-105 transition-all duration-150"
        onClick={() => {
          const input = document.getElementById("filter-input");
          input?.focus();
        }}
      />
      <InputBox
        id="filter-input"
        className="bg-input-color pb-[1px] focus-visible:outline-none w-[100%]"
        type="text"
        placeholder="search for a conversation here"
        required={false}
      />
    </div>
  );
};

export default CustomSearchBox;
