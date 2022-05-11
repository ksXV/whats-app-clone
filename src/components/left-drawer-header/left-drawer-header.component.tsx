import * as React from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";

interface LDHProps {
  changeToConvosDrawer: () => void;
  displayText: string;
}

const LeftDrawerHeader: React.FC<LDHProps> = ({
  changeToConvosDrawer,
  displayText,
}) => {
  return (
    <div className="flex items-center justify-between w-[100%] py-[0.4rem] px-6 bg-[#1A2329] h-28 relative">
      <h2 className="text-xl unselectable-text">{displayText}</h2>
      <AiOutlineArrowLeft
        className="cursor-pointer unselectable-text"
        size={"30"}
        onClick={changeToConvosDrawer}
      />
    </div>
  );
};

export default LeftDrawerHeader;
