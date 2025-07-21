import React, { useState, useRef, useEffect, forwardRef } from 'react';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const pad = n => n < 10 ? `0${n}` : n;

const CustomDatePicker = forwardRef(({ value, onChange, label = '', minDate, popupDirection = 'down', onFocus, open: controlledOpen, setOpen: setControlledOpen, placeholder }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = setControlledOpen !== undefined ? setControlledOpen : setUncontrolledOpen;
  const [viewDate, setViewDate] = useState(value || new Date());
  const localInputRef = useRef();
  const inputRef = ref || localInputRef;
  const pickerRef = useRef();

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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  const min = minDate ? new Date(minDate) : null;

  function isPastDate(y, m, d) {
    const date = new Date(y, m, d, 0, 0, 0, 0);
    if (min) return date < new Date(min.getFullYear(), min.getMonth(), min.getDate());
    return false;
  }

  function formatDisplayValue(date) {
    if (!date) return '';
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  const handleDateClick = (day) => {
    if (isPastDate(year, month, day)) return;
    const newDate = new Date(year, month, day);
    if (onChange) onChange(newDate);
    setOpen(false);
  };

  const handleMonthChange = (offset) => {
    const newView = new Date(viewDate);
    newView.setMonth(newView.getMonth() + offset);
    setViewDate(newView);
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
        value={value ? formatDisplayValue(value) : ''}
        onClick={() => setOpen(v => !v)}
        readOnly
        placeholder={placeholder || 'Select date'}
        className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer bg-white placeholder-gray-400"
        style={{ fontWeight: 400 }}
        onFocus={onFocus}
      />
      <span className="absolute pt-4 right-3 inset-y-0 my-auto flex items-center pointer-events-none h-5">
        <svg width="18" height="18" fill="none" stroke="#ffbe00" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      </span>
      {open && (
        <div
          ref={pickerRef}
          className={`absolute z-[1000] bg-white rounded-xl shadow-xl w-[90vw] min-w-[260px] max-w-[98vw] sm:max-w-xs sm:min-w-[320px] p-4 border border-gray-100 max-h-[70vh] overflow-y-auto ${popupDirection === 'up' ? 'bottom-full mb-2' : 'mt-2'}`}
          style={{ left: 0, right: 0, margin: '0 auto' }}
        >
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => handleMonthChange(-1)} className="text-yellow-600 font-bold px-2 text-lg hover:bg-yellow-50 rounded">&#8592;</button>
            <span className="font-bold text-yellow-600 text-lg">
              {viewDate.toLocaleString('default', { month: 'long' })} {year}
            </span>
            <button onClick={() => handleMonthChange(1)} className="text-yellow-600 font-bold px-2 text-lg hover:bg-yellow-50 rounded">&#8594;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => d ? (
              <button
                key={i}
                onClick={() => handleDateClick(d)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition text-base
                  ${value && value.getDate() === d && value.getMonth() === month && value.getFullYear() === year ? 'bg-yellow-500 text-white' : 'hover:bg-yellow-100 text-gray-800'}
                  ${today.getDate() === d && today.getMonth() === month && today.getFullYear() === year ? 'border border-yellow-400' : ''}
                  ${isPastDate(year, month, d) ? 'opacity-30 cursor-not-allowed' : ''}
                `}
                disabled={isPastDate(year, month, d)}
              >{d}</button>
            ) : <div key={i}></div>)}
          </div>
        </div>
      )}
    </div>
  );
});

CustomDatePicker.displayName = 'CustomDatePicker';
export default CustomDatePicker; 