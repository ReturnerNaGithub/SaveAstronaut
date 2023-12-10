import React from "react";

const FullCard = ({ photo, balance }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card mx-5">
      <img
        src={photo}
        className={` object-fit h-[400px]  rounded-xl ${
          balance > 0 ? "" : "brightness-50"
        }`}
        alt="Full"
        height="100px"
      />

      <div className="group-hover:flex flex-col w-[285px] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] p-4 rounded-md">
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {`${balance.toString()}`}
            </div>
            <p className="text-white ml-4 text-md">AstroSuitFull NFT</p>
          </div>

          {/* <img
                  //   src={download}
                  alt="download"
                  className="w-6 h-6 object-contain invert"
                /> */}
        </div>
      </div>
    </div>
  );
};

export default FullCard;
