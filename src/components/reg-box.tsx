import React from "react";

const RegBox: React.FC = () => {
  return (
    <div className="flex w-[40vw] translate-x-16">
      <input
        className="min-w-[65%] rounded-full border border-slate-500 bg-black px-10 py-5 text-gray-400 outline-none focus:ring-0"
        placeholder="Email Address"
      />
      <button
        style={{
          background:
            "linear-gradient(90deg, #AD05BC 0%, #FF1761 52.4%, #FBC82E 100%);",
        }}
        className="min-w-[35%] -translate-x-16 rounded-full py-1 font-bold"
      >
        Register
      </button>
    </div>
  );
};

export default RegBox;
