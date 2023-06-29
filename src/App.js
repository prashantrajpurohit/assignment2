import { useEffect, useState } from "react";
import "./App.css";
import { filterData } from "./helper";

function App() {
  const [listOfData, setListOfData] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [listOfSearchData, setListOfSearchData] = useState([]);
  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    const fetchedData = await fetch("https://reqres.in/api/users?page=2");
    const data = await fetchedData.json();
    setListOfData(data.data);
    setListOfSearchData(data.data);
  };

  const OnSearch = () => {
    setListOfSearchData(filterData(searchedVal, listOfData));
  };
  return (
    <>
      <div className="flex mt-2 justify-center">
        <div className=" relative  ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            value={searchedVal}
            onChange={(e) => {
              setSearchedVal(e.target.value);
            }}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          onClick={OnSearch}
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      <div className="grid grid-cols-4  sm:grid-cols-2 m-8 md:grid-cols-3 ">
        {listOfSearchData.length === 0 ? (
          <center className="text-6xl whitespace-nowrap sm:text-2xl md:text-3xl ">
            NO RECORD FOUND
          </center>
        ) : (
          listOfSearchData.map((item) => {
            return (
              <div
                key={item.id}
                className=" flex flex-col justify-center items-center "
              >
                <div className="relative ">
                  <div className="ml-28 w-[25px] absolute top-[-9px] left-[9px]">
                    <p className=" text-center rounded-full  bg-black  text-white">
                      {item.id}
                    </p>
                  </div>

                  <img
                    alt="avatar"
                    src={item.avatar}
                    className="rounded-3xl  border border-black p-2 "
                  />
                </div>
                <div className="w-32 text-center">
                  <p>{item.first_name}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
