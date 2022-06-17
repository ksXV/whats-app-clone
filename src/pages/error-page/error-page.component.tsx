import * as React from "react";

// import {location} from ""

import CustomButton from "../../components/custom-button/button.component";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  const handlePageRefresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1 className="font-bold text-2xl">Snap, something went wrong! {`:(`}</h1>
      <CustomButton
        onClick={handlePageRefresh}
        className="custom-button bg-secondary-color px-5 m-2"
      >
        Refresh the page
      </CustomButton>
    </div>
  );
};

export default ErrorPage;
