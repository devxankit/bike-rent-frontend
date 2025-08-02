import React, { useState, useRef, useEffect, forwardRef } from 'react';

const generateTimes = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? 'AM' : 'PM';
      times.push({
        label: `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`,
        hour: h,
        minute: m
      });
    }
  }
  return times;
};

const isToday = (date) => {
  if (!date) return false;
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const isPastTime = (selectedDate, hour, minute, minDateTime) => {
  if (!selectedDate) return false;
  // If minDateTime is provided and selectedDate is the same day as minDateTime, block times before minDateTime
  if (minDateTime) {
    const sameDay =
      selectedDate.getFullYear() === minDateTime.getFullYear() &&
      selectedDate.getMonth() === minDateTime.getMonth() &&
      selectedDate.getDate() === minDateTime.getDate();
    if (sameDay) {
      if (hour < minDateTime.getHours()) return true;
      if (hour === minDateTime.getHours() && minute < minDateTime.getMinutes()) return true;
    }
  }
  // Fallback to blocking times in the past compared to now (for today)
  if (!isToday(selectedDate)) return false;
  const now = new Date();
  if (hour < now.getHours()) return true;
  if (hour === now.getHours() && minute < now.getMinutes()) return true;
  return false;
};

const CustomTimePicker = forwardRef(({
  value, onChange, label = '', selectedDate, popupDirection = 'down', onFocus, open: controlledOpen, setOpen: setControlledOpen, placeholder, minDateTime, maxDateTime 
}, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = setControlledOpen !== undefined ? setControlledOpen : setUncontrolledOpen;
  const localInputRef = useRef();
  const inputRef = ref || localInputRef;
  const pickerRef = useRef();
  const times = generateTimes();

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
  }, [inputRef]);

  function formatDisplayValue(date) {
    if (!date) return '';
    const hour = date.getHours();
    const minute = date.getMinutes();
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }

  const handleTimeClick = (h, m, disabled) => {
    if (disabled) return;
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(h, m, 0, 0);
    if (onChange) onChange(newDate);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {label && <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={value ? formatDisplayValue(value) : ''}
        onClick={() => setOpen(v => !v)}
        readOnly
        placeholder={placeholder || 'Select time'}
        className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer bg-white placeholder-gray-400"
        style={{ fontWeight: 400 }}
        onFocus={onFocus}
      />
      <span className="absolute right-3 pt-4 inset-y-0 my-auto flex items-center pointer-events-none h-5">
        <svg width="18" height="18" fill="none" stroke="#FDB813" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </span>
      {open && (
        <div
          ref={pickerRef}
          className={`absolute z-[1000] bg-white rounded-lg shadow-xl max-w-[98vw] min-w-[120px] w-full sm:max-w-xs sm:min-w-[180px] p-2 border border-gray-100 max-h-60 overflow-y-auto ${popupDirection === 'up' ? 'bottom-full mb-2' : 'mt-2'}`}
          style={{ left: 0, right: 0, margin: '0 auto' }}
        >
          <div className="flex flex-col gap-1">
            {times.filter(t => !isPastTime(selectedDate, t.hour, t.minute, minDateTime)).map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleTimeClick(t.hour, t.minute, false)}
                className={`w-full py-1 rounded text-sm font-semibold transition text-left px-3
                  ${value && value.getHours() === t.hour && value.getMinutes() === t.minute ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100 text-gray-800'}
                `}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

CustomTimePicker.displayName = 'CustomTimePicker';
export default CustomTimePicker; 