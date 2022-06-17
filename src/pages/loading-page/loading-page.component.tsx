import * as React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingPageProps {}

const LoadingPage: React.FC<LoadingPageProps> = () => {
  const cssOptions = "background-color: white; margin: 0.5rem;";
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Loading ...</h1>
      <ClipLoader size={40} color={"white"} css={cssOptions} />
    </div>
  );
};

export default LoadingPage;
