import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../util/calendardata.js";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const New = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const [checkinopen, setCheckinopen] = useState(false);
  const [checkoutopen, setCheckoutopen] = useState(false);

  const [indate, setInDate] = useState(null);
  const [outdate, setOutDate] = useState(null);

  const handledate = (date) => {
    if (checkinopen && (!outdate || outdate >= date)) {
      setInDate(date);
    } else if (checkinopen && (!outdate || outdate < date)) {
      setOutDate(date);
      setInDate(null);
    } else if (checkoutopen && (!indate || indate <= date)) {
      setOutDate(date);
    } else {
      setInDate(date);
      setOutDate(null);
    }
  };
  return (
    <div className="flex items-start justify-center mt-16 ">
      <div className="relative w-[75%] max-w-[400px]">
        <div className="py-2 bg-blue-300 flex justify-evenly items-center border shadow-md rounded-lg ">
          <div>
            <h1
              className={`font-bold cursor-pointer transition-all hover:text-white ${
                checkinopen && "text-white"
              }`}
              onClick={() => {
                setCheckinopen((prev) => !prev);
                setCheckoutopen(false);
              }}
            >
              Check in
            </h1>
            {indate ? (
              <h1 className="font-semibold text-slate-500">
                {indate.toDate().getDate()} {months[indate.toDate().getMonth()]}
              </h1>
            ) : (
              <h1>Add Date</h1>
            )}
          </div>

          <div>
            <h1
              className={`font-bold cursor-pointer transition-all hover:text-white ${
                checkoutopen && "text-white"
              }`}
              onClick={() => {
                setCheckoutopen((prev) => !prev);
                setCheckinopen(false);
              }}
            >
              Check out
            </h1>
            {outdate ? (
              <h1 className="font-semibold text-slate-500">
                {outdate.toDate().getDate()}{" "}
                {months[outdate.toDate().getMonth()]}
              </h1>
            ) : (
              <h1>Add Date</h1>
            )}
          </div>
        </div>
        {(checkoutopen || checkinopen) && (
          <div className="absolute  mt-2 w-[100%] max-w-[400px]">
            <div className="border-2 rounded-lg shadow-md ">
              <div className="flex justify-between items-center px-1 py-2">
                <GrFormPrevious
                  className=" w-5 h-5 cursor-pointer hover:scale-105 transition-all "
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                />
                <h1 className="font-semibold">
                  {months[today.month()]} {today.year()}
                </h1>
                <GrFormNext
                  className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    setToday(today.month(today.month() + 1));
                  }}
                />
              </div>
              <div className="flex h-8 justify-between px-2 items-center">
                {days.map((day, index) => {
                  return (
                    <h1
                      key={index}
                      className="text-sm text-center place-content-center text-gray-500 select-none"
                    >
                      {day}
                    </h1>
                  );
                })}
              </div>
              <div className="grid grid-cols-7">
                {generateDate(today.month(), today.year()).map(
                  ({ date, currentMonth, today, validdata }, index) => {
                    return (
                      <div
                        key={index}
                        className={`text-center h-14 grid place-content-center text-sm border-t `}
                      >
                        <h1
                          className={`
                            ${currentMonth ? "" : "hidden"}
                            ${
                              validdata
                                ? "hover:bg-black hover:text-white"
                                : "text-gray-300 "
                            }
                            ${
                              indate &&
                              indate.toDate().toDateString() ===
                                date.toDate().toDateString()
                                ? "bg-blue-800 text-white"
                                : ""
                            }
                            ${
                              outdate &&
                              outdate.toDate().toDateString() ===
                                date.toDate().toDateString()
                                ? "bg-blue-800 text-white"
                                : ""
                            }
                            ${
                              indate &&
                              outdate &&
                              date >= indate &&
                              date <= outdate &&
                              "bg-blue-300"
                            }
                            h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none
                          `}
                          onClick={() => {
                            handledate(date);
                          }}
                        >
                          {date.date()}
                        </h1>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default New;
