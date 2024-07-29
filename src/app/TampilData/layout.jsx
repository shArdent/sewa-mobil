"use client"

import { useSearchFilterStore } from "@/libs/store";
import ContentTab from "../components/PanelContent/ContentTab";

const TampilanDataLayout = ({ children }) => {

  const setSearchFilter = useSearchFilterStore((state) => state.setSearchFilter);


  return (
    <div className="px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      <div className="w-full h-auto">
        <h1 className="text-4xl underline italic">Tampil Data</h1>
        <div className="w-full h-auto rounded-lg border-2 border-gray-400 mt-10">
          <ContentTab />
          <div className="px-5 py-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={(e) => setSearchFilter(e.target.value)}
                type="text"
                className="grow border p-3 rounded-lg"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-8 h-8 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TampilanDataLayout;
