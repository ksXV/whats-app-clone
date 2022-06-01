import * as React from "react";

import { createRef } from "react";

import InputBox from "../input-box/input-box.component";

interface TextMessagesInputProps {
  onInputChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const TextMessagesInput: React.FC<TextMessagesInputProps> = ({
  onInputChange,
  sendMessage,
}) => {
  const textInput = createRef<HTMLInputElement>();
  return (
    <div className="py-3 px-2 bg-[#1A2329]">
      <InputBox
        ref={textInput}
        type="text"
        className="bg-input-color rounded-xl border-2 border-gray-700 h-10 px-2 focus-visible:outline-none w-[100%]"
        onKeyPress={(event): void => {
          if (event.key === "Enter") {
            sendMessage();
            textInput.current!.value = "";
          }
        }}
        onChange={onInputChange}
        required={false}
        placeholder="type a message here"
      />
    </div>
  );
};

export default TextMessagesInput;
