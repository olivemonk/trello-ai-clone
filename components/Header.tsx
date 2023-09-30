"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { stat } from "fs";

const Header = () => {
    const [searchString, setSearchString] = useBoardStore((state) => [state.searchString, state.setSearchString])
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl  ">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded filter blur-3xl opacity-50 -z-50 " />
        <Image
          priority
          src="https://links.papareact.com/c2cdd5"
          width={300}
          alt="trello image"
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end">
          {/* search box */}
          <form
            className="flex items-center space-x-5 bg-white rounded-md shadow-md p-2 flex-1 md:flex-initial"
            action=""
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          {/* avatar */}
          <Avatar name="Olive Monk" round color="#0055d1" size="50" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-3 md:py-5">
        <p className="flex items-center text-sm font-light p-2 pr-5 shadow-xl rounded-xl w-fit bg-white max-w-3xl italic text-[#0055d1]">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0055d1] mr-1" />
          GPT is summarizing your tasks....
        </p>
      </div>
    </header>
  );
};

export default Header;
