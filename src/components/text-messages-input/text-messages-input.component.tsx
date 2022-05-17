import * as React from "react";
import InputBox from "../input-box/input-box.component";

interface TextMessagesInputProps {
  onInputChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const TextMessagesInput: React.FC<TextMessagesInputProps> = ({
  onInputChange,
  sendMessage,
}) => {
  return (
    <div>
      <div className="py-3 px-2 bg-[#1A2329]">
        <InputBox
          type="text"
          className="bg-input-color rounded-xl border-2 border-gray-700 h-10 px-2 focus-visible:outline-none w-[100%]"
          onKeyPress={(event): void => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          onChange={onInputChange}
          required={false}
          placeholder="type a message here"
        />
      </div>
    </div>
  );
};

export default TextMessagesInput;