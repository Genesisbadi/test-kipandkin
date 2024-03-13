import Calendar from "@/components/icons/Calendar";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useEffect, useState, useRef } from "react";

import { DateRange } from "react-date-range";

import User from "@/components/icons/User";
import ArrowDown from "@/components/icons/ArrowDown";

import globalData from "@/lib/preBuildScripts/static/globalData.json";
import config from "site.config";

export default function BookingForm({ ...props }) {
  const { booking_id } = globalData.tenantDetails.data.main;
  const { bookingUrl } = config;

  const calendarRef = useRef(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const [guestAdult, setGuestAdult] = useState({
    min: 1,
    value: 1,
  });
  const [guestChildren, setGuestChildren] = useState({
    min: 0,
    value: 0,
  });

  const [selectionRange, setSelectionRange] = useState({
    // startDate: new Date(),
    // endDate: new Date(),
    key: "selection",
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setShowGuests(false);
  };

  const toggleGuest = () => {
    setShowCalendar(false);
    setShowGuests(!showGuests);
  };

  const arrivalDisplayDate = selectionRange?.startDate?.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
  const departureDisplayDate = selectionRange?.endDate?.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  const arrivalDate = selectionRange?.startDate
    ?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const departureDate = selectionRange?.endDate
    ?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const calendarSelector = (ranges) => {
    setSelectionRange(ranges?.selection);
  };

  const updateGuest = (type, action) => {
    if (type === "adult") {
      setGuestAdult((prevState) => {
        let newValue;
        if (action === "increment") {
          newValue = prevState.value + 1;
        } else if (action === "decrement") {
          newValue = Math.max(prevState.value - 1, prevState.min);
        }
        return { ...prevState, value: newValue };
      });
    } else if (type === "children") {
      setGuestChildren((prevState) => {
        let newValue;
        if (action === "increment") {
          newValue = prevState.value + 1;
        } else if (action === "decrement") {
          newValue = Math.max(prevState.value - 1, prevState.min);
        }
        return { ...prevState, value: newValue };
      });
    }
  };

  const submitBooking = () => {
    setShowCalendar(false);
    setShowGuests(false);
    setGuestChildren({ min: 0, value: 0 });
    setGuestAdult({ min: 1, value: 1 });
    setSelectionRange({ key: "selection" });
    window.open(
      bookingUrl +
        `?hotel=${booking_id}&child=${guestChildren.value}&adult=${guestAdult.value}&depart=${departureDate}&arrive=${arrivalDate}`
    );
  };

  useEffect(() => {}, [arrivalDisplayDate, departureDisplayDate]);
  const today = new Date();

  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 5);

  return (
    <>
      {booking_id && (
        <div className="absolute backdrop-blur-[2px] w-full z-[1] bg-[#fff] bg-opacity-70 border-t-[1px] border-[#fff] select-none">
          <div className="flex justify-end text-[14px] h-full">
            <div className="text-primary py-[10px] pr-[15px] border-r-[1px] border-[#a7a7a7] text-[16px] uppercase">
              Quick book
            </div>
            <span className="relative">
              {showCalendar && (
                <DateRange
                  className="absolute top-[100%] left-0"
                  ranges={[selectionRange]}
                  onChange={calendarSelector}
                  minDate={today}
                  maxDate={maxDate}
                />
              )}
            </span>
            <div
              className="form-item min-w-[160px] relative flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
              onClick={toggleCalendar}
            >
              <Calendar className="mr-[10px]" />
              {!arrivalDisplayDate ? "Arrival" : arrivalDisplayDate}
            </div>

            <div
              className="form-item min-w-[160px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
              onClick={toggleCalendar}
            >
              <Calendar className="mr-[10px]" />
              {!departureDisplayDate ? "Departure" : departureDisplayDate}
            </div>
            <span className="relative">
              {showGuests && (
                <div className="absolute min-w-[250px] top-[100%] left-0 bg-white shadow-md">
                  <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                    <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                      Adult{guestAdult.value > 1 ? "s" : ""}:
                    </span>

                    <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                      {guestAdult.value}
                      <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                        <button
                          className="mb-[10px]"
                          onClick={() => updateGuest("adult", "increment")}
                        >
                          <ArrowDown className="rotate-180" width={10} />
                        </button>
                        {guestAdult.value > 1 && (
                          <button
                            onClick={() => updateGuest("adult", "decrement")}
                          >
                            <ArrowDown width={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                    <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                      Children:
                    </span>

                    <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                      {guestChildren.value}
                      <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                        <button
                          className="mb-[10px]"
                          onClick={() => updateGuest("children", "increment")}
                        >
                          <ArrowDown className="rotate-180" width={10} />
                        </button>

                        {guestChildren.value !== 0 && (
                          <button
                            onClick={() => updateGuest("children", "decrement")}
                          >
                            <ArrowDown width={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </span>
            <div
              className="form-item min-w-[160px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
              onClick={toggleGuest}
            >
              <User className="mr-[10px]" />
              {guestAdult.value} Adults, {guestChildren.value} Children{" "}
              <ArrowDown className="ml-[5px]" width={10} />
            </div>

            <div
              className="bg-primary text-white items-center py-[10px] px-[20px] uppercase cursor-pointer hover:bg-[#555]"
              onClick={submitBooking}
            >
              Check Availability
            </div>
          </div>
        </div>
      )}
    </>
  );
}
