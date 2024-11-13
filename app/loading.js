"use client";

import { Bars } from "react-loader-spinner";

function Loading() {
  // find a solution to the placeholder
  // start built the rest of the pages
  return (
    <div className="w-full h-[89vh] flex justify-center items-center">
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

export default Loading;
