import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const isValidDayjs = val => val && typeof val.isValid === 'function' && val.isValid();

const BookingForm = ({
  city, setCity,
  bookingType, setBookingType,
  pickDate, setPickDate,
  pickTime, setPickTime,
  dropDate, setDropDate,
  dropTime, setDropTime,
  onFindBike,
  durationText, // not used, calculated below
}) => {
  // Picker open states
  const [pickDateOpen, setPickDateOpen] = useState(false);
  const [pickTimeOpen, setPickTimeOpen] = useState(false);
  const [dropDateOpen, setDropDateOpen] = useState(false);
  const [dropTimeOpen, setDropTimeOpen] = useState(false);

  // Set default pick up date and time to now if not set (as Dayjs)
  useEffect(() => {
    if (!isValidDayjs(pickDate) && setPickDate) setPickDate(dayjs());
    if (!isValidDayjs(pickTime) && setPickTime) setPickTime(dayjs());
  }, [pickDate, pickTime, setPickDate, setPickTime]);

  // Defensive onChange for DatePicker/TimePicker (always store Dayjs or null)
  const handleDayjsChange = setter => val => setter(isValidDayjs(val) ? val : null);

  // Calculate duration
  let durationDisplay = '-';
  if (isValidDayjs(pickDate) && isValidDayjs(dropDate)) {
    const start = pickDate.startOf('day');
    const end = dropDate.startOf('day');
    const diffDays = end.diff(start, 'day');
    if (diffDays > 0) {
      durationDisplay = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays === 0 && isValidDayjs(pickTime) && isValidDayjs(dropTime)) {
      // If same day, show hours
      const startTime = pickTime.hour();
      const endTime = dropTime.hour();
      const hourDiff = endTime - startTime;
      if (hourDiff > 0) {
        durationDisplay = `${hourDiff} Hour${hourDiff > 1 ? 's' : ''}`;
      } else {
        durationDisplay = '-';
      }
    } else {
      durationDisplay = '-';
    }
  }

  return (
    <Paper elevation={3} sx={{ bgcolor: 'white', p: { xs: 2, md: 3 }, borderRadius: 2.5, minWidth: 280, maxWidth: 400, width: '100%', mx: 'auto', boxShadow: 3 }}>
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Typography variant="subtitle1" fontWeight={600} color="#222" mb={0.5} fontSize={17}>
          Scooter/Scooty/Bike on Rent in Delhi
        </Typography>
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel sx={{ color: '#aaa', fontWeight: 700, fontSize: 17 }}>Select City</InputLabel>
          <Select
            value={city}
            label="Select City"
            onChange={e => setCity(e.target.value)}
            IconComponent={() => null}
            endAdornment={<InputAdornment position="end"><LocationOnIcon sx={{ color: '#8BC34A', fontSize: 20 }} /></InputAdornment>}
            sx={{ fontSize: 16, bgcolor: '#f8f8f8', borderRadius: 1, '.MuiOutlinedInput-notchedOutline': { borderColor: '#eee' }, height: 44 }}
          >
            <MenuItem value="Indore">Indore</MenuItem>
            <MenuItem value="Bhopal">Bhopal</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" gap={1}>
          {/* Pick Up Date */}
          <DatePicker
            label="Pick Up Date"
            value={isValidDayjs(pickDate) ? pickDate : null}
            onChange={handleDayjsChange(setPickDate)}
            sx={{ width: '100%' }}
            inputFormat="MM/DD/YYYY"
            open={pickDateOpen}
            onOpen={() => setPickDateOpen(true)}
            onClose={() => setPickDateOpen(false)}
            slotProps={{
              textField: {
                size: 'small',
                variant: 'outlined',
                placeholder: 'Pick Up Date',
                InputLabelProps: { style: { color: '#aaa', fontWeight: 700, fontSize: 17 } },
                InputProps: {
                  style: { fontSize: 16, background: '#f8f8f8', borderRadius: 1, height: 44 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon sx={{ color: '#8BC34A', fontSize: 20, cursor: 'pointer' }} onClick={() => setPickDateOpen(true)} />
                    </InputAdornment>
                  ),
                  inputProps: {
                    'aria-label': 'Pick Up Date',
                    autoComplete: 'off',
                    readOnly: false,
                  },
                },
              },
            }}
          />
          {/* Pick Time */}
          <TimePicker
            label="Pick Time"
            value={isValidDayjs(pickTime) ? pickTime : null}
            onChange={handleDayjsChange(setPickTime)}
            sx={{ width: '100%' }}
            inputFormat="hh:mm A"
            ampm={true}
            minutesStep={5}
            open={pickTimeOpen}
            onOpen={() => setPickTimeOpen(true)}
            onClose={() => setPickTimeOpen(false)}
            slotProps={{
              textField: {
                size: 'small',
                variant: 'outlined',
                placeholder: 'Pick Time',
                InputLabelProps: { style: { color: '#aaa', fontWeight: 700, fontSize: 17 } },
                InputProps: {
                  style: { fontSize: 16, background: '#f8f8f8', borderRadius: 1, height: 44 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccessTimeIcon sx={{ color: '#8BC34A', fontSize: 20, cursor: 'pointer' }} onClick={() => setPickTimeOpen(true)} />
                    </InputAdornment>
                  ),
                  inputProps: {
                    'aria-label': 'Pick Time',
                    autoComplete: 'off',
                    readOnly: false,
                  },
                },
              },
            }}
          />
        </Box>
        <Box display="flex" gap={1}>
          {/* Drop Off Date */}
          <DatePicker
            label="Drop Off Date"
            value={isValidDayjs(dropDate) ? dropDate : null}
            onChange={handleDayjsChange(setDropDate)}
            sx={{ width: '100%' }}
            inputFormat="MM/DD/YYYY"
            open={dropDateOpen}
            onOpen={() => setDropDateOpen(true)}
            onClose={() => setDropDateOpen(false)}
            slotProps={{
              textField: {
                size: 'small',
                variant: 'outlined',
                placeholder: 'Drop Off Date',
                InputLabelProps: { style: { color: '#aaa', fontWeight: 700, fontSize: 17 } },
                InputProps: {
                  style: { fontSize: 16, background: '#f8f8f8', borderRadius: 1, height: 44 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon sx={{ color: '#F44336', fontSize: 20, cursor: 'pointer' }} onClick={() => setDropDateOpen(true)} />
                    </InputAdornment>
                  ),
                  inputProps: {
                    'aria-label': 'Drop Off Date',
                    autoComplete: 'off',
                    readOnly: false,
                  },
                },
              },
            }}
          />
          {/* Drop Time */}
          <TimePicker
            label="Drop Time"
            value={isValidDayjs(dropTime) ? dropTime : null}
            onChange={handleDayjsChange(setDropTime)}
            sx={{ width: '100%' }}
            inputFormat="hh:mm A"
            ampm={true}
            minutesStep={5}
            open={dropTimeOpen}
            onOpen={() => setDropTimeOpen(true)}
            onClose={() => setDropTimeOpen(false)}
            slotProps={{
              textField: {
                size: 'small',
                variant: 'outlined',
                placeholder: 'Drop Time',
                InputLabelProps: { style: { color: '#aaa', fontWeight: 700, fontSize: 17 } },
                InputProps: {
                  style: { fontSize: 16, background: '#f8f8f8', borderRadius: 1, height: 44 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccessTimeIcon sx={{ color: '#F44336', fontSize: 20, cursor: 'pointer' }} onClick={() => setDropTimeOpen(true)} />
                    </InputAdornment>
                  ),
                  inputProps: {
                    'aria-label': 'Drop Time',
                    autoComplete: 'off',
                    readOnly: false,
                  },
                },
              },
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mb: 0.5, fontSize: 14 }}>
          Duration: {durationDisplay}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          sx={{
            fontWeight: 600,
            fontSize: 16,
            py: 1.2,
            mt: 0.5,
            bgcolor: '#8BC34A',
            color: 'white',
            '&:hover': { bgcolor: '#7CB342' },
          }}
          onClick={onFindBike}
        >
          Find Bike
        </Button>
      </Box>
    </Paper>
  );
};

export default BookingForm; 