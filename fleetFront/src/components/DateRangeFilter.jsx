import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const DateRangeFilter = ({ placeholder = "Select date", onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (ranges) => {
    const { startDate: newStart, endDate: newEnd } = ranges.selection;
    setStartDate(newStart);
    setEndDate(newEnd);
    onChange?.({ start: newStart, end: newEnd });
  };

  const selectionRange = {
    key: "selection",
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
  };

  const displayText =
    startDate && endDate
      ? `${format(startDate, "yyyy-MM-dd")} to ${format(endDate, "yyyy-MM-dd")}`
      : placeholder;

  return (
    <div className="relative inline-block" ref={pickerRef}>
      <button
        className="border px-4 py-2 rounded-md text-sm w-64 h-10 text-left bg-white"
        onClick={() => setShowPicker(!showPicker)}
      >
        <span className={startDate ? "text-gray-800" : "text-gray-400"}>
          {displayText}
        </span>
      </button>

      {showPicker && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg border rounded">
          <DateRange
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[selectionRange]}
            editableDateInputs={true}
            retainEndDateOnFirstSelection={true}
            maxDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
