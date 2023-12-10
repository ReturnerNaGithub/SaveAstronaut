import React from "react";
// import { download } from "../assets";
// import { downloadImage } from "../utils";

const type = ["Gloves", "Helmet", "Suit", "Boots"];

const Card = ({ _id, name, photo, balance, mint, address }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card mx-5">
      <img
        src={photo}
        className={`${
          balance > 0 ? "" : "brightness-50"
        } w-full object-cover h-full rounded-xl`}
        alt={type[_id]}
      />

      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto prompt">{`${type[_id]}`}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {`${balance.toString()}`}
            </div>
            <p className="text-white text-[12px]">{`${name}`}</p>
          </div>
          <button
            type="button"
            className="text-white bg-emerald-600 font-medium rounded-md text-md w-full sm:w-auto px-3 py-1.5 text-center"
            onClick={async () => {
              await mint(_id, address);
            }}
          >
            +
          </button>

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

export default Card;
