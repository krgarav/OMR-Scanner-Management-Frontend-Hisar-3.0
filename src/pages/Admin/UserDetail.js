import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_IP } from "../../services/common";
import { useParams } from "react-router-dom";

function UserDetail() {
  const [userDetails, setUserDetails] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://${REACT_APP_IP}:4000/user/details/${id}`
        );
        setUserDetails(response.data?.userActivitydetails || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [id]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userDetails.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(userDetails.length / rowsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    renderPageNumbers.push(
      <button
        key={i}
        id={i}
        onClick={handleClick}
        className={`px-3 py-1 mx-1 ${currentPage === i ? 'bg-blue-500 text-white rounded-md' : 'bg-gray-200 text-gray-700 rounded-md'}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600 h-[100vh] pt-20">
      <div className="overflow-x-auto rounded-3xl w-[800px] shadow-sm shadow-white">
        <div className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm w-full">
          <div className="px-4 py-8">
            <h1 className="text-3xl font-semibold px-4 pb-6">User Detail</h1>
            <div className="mx-4 border-2 rounded-xl">
              <div className="ltr:text-left rtl:text-right">
                <div className="text-xl flex font-bold text-center border-b-2 border-gray-200">
                  <div className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 w-1/4">
                    S.No
                  </div>
                  <div className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 w-1/4">
                    Action
                  </div>
                  <div className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 w-1/4">
                    Date
                  </div>
                  <div className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 w-1/4">
                    Time
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 text-center min-h-[360px]  ">
                {currentRows.map((data, index) => {
                  const dateObject = new Date(data?.timestamp);
                  const date = dateObject.toLocaleDateString("en-GB");
                  const timeOptions = {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  };
                  const time = dateObject.toLocaleTimeString("en-US", timeOptions);

                  return (
                    <div key={index} className="even:bg-blue-50 flex">
                      <div className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 w-1/4">
                        {indexOfFirstRow + index + 1}
                      </div>
                      <div className="whitespace-nowrap px-4 py-3 text-gray-700 w-1/4">
                        {data.action}
                      </div>
                      <div className="whitespace-nowrap px-4 py-3 text-gray-700 w-1/4">
                        {date}
                      </div>
                      <div className="whitespace-nowrap px-4 py-3 text-gray-704 w-1/4">
                        {time}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center py-4">
                {renderPageNumbers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
