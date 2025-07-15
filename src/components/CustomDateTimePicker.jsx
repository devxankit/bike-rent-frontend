import React, { useState, useRef, useEffect } from 'react';

// Global variable to track open picker
let openPickerId = null;

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const pad = n => n < 10 ? `0${n}` : n;

function parseDateTimeInput(input) {
  const parsed = new Date(input);
  if (!isNaN(parsed.getTime())) return parsed;
  const match = input.match(/(\w+) (\d{1,2}), (\d{4}) (\d{1,2}):(\d{2}) ?([APMapm]{2})/);
  if (match) {
    const [_, month, day, year, hour, minute, ampm] = match;
    let h = parseInt(hour, 10);
    if (ampm.toLowerCase() === 'pm' && h !== 12) h += 12;
    if (ampm.toLowerCase() === 'am' && h === 12) h = 0;
    return new Date(`${month} ${day}, ${year} ${pad(h)}:${minute}`);
  }
  return null;
}

const CustomDateTimePicker = ({ value, onChange, label = '', minDate = new Date() }) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false); // new state for dropdown direction
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [viewDate, setViewDate] = useState(value || new Date());
  const [inputValue, setInputValue] = useState(() => formatDisplayValue(value || new Date()));
  const inputRef = useRef();
  const pickerRef = useRef();
  const idRef = useRef(Math.random().toString(36).slice(2));

  // Only one picker open at a time
  useEffect(() => {
    if (open) {
      openPickerId = idRef.current;
    }
  }, [open]);
  useEffect(() => {
    function handleClick(e) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  useEffect(() => {
    if (!open) return;
    function handleOtherOpen() {
      if (openPickerId !== idRef.current) setOpen(false);
    }
    window.addEventListener('custom-picker-open', handleOtherOpen);
    return () => window.removeEventListener('custom-picker-open', handleOtherOpen);
  }, [open]);
  const handleInputClick = () => {
    if (!open) {
      openPickerId = idRef.current;
      window.dispatchEvent(new Event('custom-picker-open'));
      // Dynamic dropdown direction
      setTimeout(() => {
        if (inputRef.current) {
          const rect = inputRef.current.getBoundingClientRect();
          const dropdownHeight = 350; // estimate, adjust as needed
          const spaceBelow = window.innerHeight - rect.bottom;
          setDropUp(spaceBelow < dropdownHeight);
        }
      }, 0);
    }
    setOpen(v => !v);
  };

  // Generate 24 time slots (12:00 AM to 11:00 PM)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setHours(i, 0, 0, 0);
    return date;
  });

  // Calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  function isPastDate(y, m, d) {
    const date = new Date(y, m, d, 0, 0, 0, 0);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function isPastTime(slot) {
    // Disable if slot is before now (for any date)
    const now = new Date();
    return slot < now;
  }

  function formatDisplayValue(date) {
    if (!date) return '';
    const monthName = date.toLocaleString('default', { month: 'long' });
    const day = pad(date.getDate());
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = pad(date.getMinutes());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${monthName} ${day}, ${year} ${pad(hour)}:${minute} ${ampm}`;
  }

  const handleDateClick = (day) => {
    if (isPastDate(year, month, day)) return;
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    newDate.setMonth(month);
    newDate.setDate(day);
    setSelectedDate(newDate);
    setInputValue(formatDisplayValue(newDate));
  };

  const handleTimeClick = (date) => {
    setSelectedDate(date);
    setInputValue(formatDisplayValue(date));
    setOpen(false);
    if (onChange) onChange(date);
  };

  const handleMonthChange = (offset) => {
    const newView = new Date(viewDate);
    newView.setMonth(newView.getMonth() + offset);
    setViewDate(newView);
  };

  // Manual input handling
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const parsed = parseDateTimeInput(e.target.value);
    if (parsed && !isPastDate(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())) {
      setSelectedDate(parsed);
      if (onChange) onChange(parsed);
    }
  };

  // Calendar days
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="relative w-full">
      {label && <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="MM/DD/YYYY  HH:MM AM/PM"
        className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer bg-white placeholder-gray-400"
        style={{ fontWeight: 400 }}
      />
      {open && (
        <div
          ref={pickerRef}
          className={`absolute z-50 bg-white rounded-lg shadow-xl flex flex-row max-w-[98vw] min-w-[180px] w-full sm:max-w-xs sm:min-w-[380px] sm:w-auto ${dropUp ? 'bottom-full mb-2' : 'mt-2'} p-1 sm:p-0`}
          style={{ left: 0, right: 0, margin: '0 auto' }}
        >
          {/* Calendar */}
          <div className="p-1 sm:p-4 flex-1">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <button onClick={() => handleMonthChange(-1)} className="text-green-600 font-bold px-1 sm:px-2 text-xs sm:text-lg">&#8592;</button>
              <span className="font-bold text-green-600 text-xs sm:text-lg">
                {viewDate.toLocaleString('default', { month: 'long' })} {year}
              </span>
              <button onClick={() => handleMonthChange(1)} className="text-green-600 font-bold px-1 sm:px-2 text-xs sm:text-lg">&#8594;</button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] sm:text-xs font-semibold text-gray-500 mb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {days.map((d, i) => d ? (
                <button
                  key={i}
                  onClick={() => handleDateClick(d)}
                  className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold transition text-[11px] sm:text-base
                    ${selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'bg-green-500 text-white' : 'hover:bg-green-100 text-gray-800'}
                    ${today.getDate() === d && today.getMonth() === month && today.getFullYear() === year ? 'border border-green-400' : ''}
                    ${isPastDate(year, month, d) ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                  disabled={isPastDate(year, month, d)}
                >{d}</button>
              ) : <div key={i}></div>)}
            </div>
          </div>
          {/* Time slots */}
          <div className="p-1 sm:p-4 border-l border-gray-200 flex flex-col gap-0.5 sm:gap-2 min-w-[60px] sm:min-w-[120px] max-h-32 sm:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100">
            <div className="mb-0.5 sm:mb-2 font-semibold text-green-600 text-xs sm:text-sm">Time</div>
            {timeSlots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => !isPastTime(slot) && handleTimeClick(slot)}
                className={`w-full py-0.5 sm:py-1 rounded text-[11px] sm:text-sm font-semibold transition
                  ${selectedDate.getHours() === slot.getHours() && selectedDate.getDate() === slot.getDate() && selectedDate.getMonth() === slot.getMonth() ? 'bg-green-500 text-white' : 'hover:bg-green-100 text-gray-800'}
                  ${isPastTime(slot) ? 'opacity-30 cursor-not-allowed' : ''}
                `}
                disabled={isPastTime(slot)}
              >
                {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateTimePicker; 