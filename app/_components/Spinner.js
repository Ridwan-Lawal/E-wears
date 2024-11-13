"use client";

import { Bars } from "react-loader-spinner";

function Spinner() {
  return (
    // className="w-full h-[89vh] flex justify-center items-center"
    <div className=" h-[89vh] w-[50%] mx-auto flex justify-center items-center">
      <Bars
        height="50"
        width="50"
        color="#4338ca"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner;
