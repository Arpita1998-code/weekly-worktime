"use client";
import React, { useState } from 'react';

const Page = () => {
  const [schedule, setSchedule] = useState([
    { day: 'SUN', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'MON', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'TUE', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'WED', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'THU', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'FRI', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
    { day: 'SAT', slots: [{ startTime: '', endTime: '', hourlyRate: '', isOpen: true }] },
  ]);

  const handleAddSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push({ 
      startTime: '',  
      endTime: '', 
      hourlyRate: '', 
      isOpen: true,
      isFullDay: false
    });
    setSchedule(newSchedule);
  };
  

  const handleChange = (dayIndex: number, slotIndex: number, field: string, value: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleToggle = (dayIndex: number, slotIndex: number, toggleType: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][toggleType] = !newSchedule[dayIndex].slots[slotIndex][toggleType];
    setSchedule(newSchedule);

    const isOpen = newSchedule[dayIndex].slots.every(slot => slot.isOpen);
    if (!isOpen) 
    {
      newSchedule[dayIndex].disablePlusButton = true;
    } 
    else 
    {
      newSchedule[dayIndex].disablePlusButton = false;
    }
    setSchedule(newSchedule);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitted:', schedule);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <h1 className='font-bold absolute top-14 left-[740px]'>From</h1>
          <h1 className='font-bold absolute top-14 left-[830px]'>To</h1>
          <h1 className='font-bold absolute top-14 left-[970px]'>Hourly Rate</h1>
        </div>
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4 grid grid-cols-5 gap-4 items-center">
            <label className="mb-3 font-bold w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 mr-2">{day.day}</label>
            {day.slots.map((slot, slotIndex) => (
              <React.Fragment key={slotIndex}>
                <div className="col-span-1">
                  <label htmlFor={`check-${dayIndex}-${slotIndex}`} className="flex bg-gray-300 cursor-pointer relative w-12 h-6 rounded-full">
                    <input type="checkbox" id={`check-${dayIndex}-${slotIndex}`} className='sr-only peer' checked={slot.isOpen} onChange={() => handleToggle(dayIndex, slotIndex, 'isOpen')} />
                    <span className={`w-5 h-5 bg-white absolute rounded-full left-1 top-1 peer-checked:bg-blue-600 peer-checked:left-6 transition-all duration-500 ${slot.isOpen ? 'peer-checked:bg-blue-600 peer-checked:left-6' : ''}`}></span>
                  </label>
                </div>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleChange(dayIndex, slotIndex, 'startTime', e.target.value)}
                  className={`border border-gray-400 px-2 py-1 rounded col-span-1 ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                  disabled={!slot.isOpen}
                />
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleChange(dayIndex, slotIndex, 'endTime', e.target.value)}
                  className={`border border-gray-400 px-2 py-1 rounded col-span-1 ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                  disabled={!slot.isOpen}
                />
                <div className="relative col-span-1 flex">
                  <input
                    type="number"
                    value={slot.hourlyRate}
                    onChange={(e) => handleChange(dayIndex, slotIndex, 'hourlyRate', e.target.value)}
                    className={`border border-gray-400 px-2 py-1 rounded ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                    disabled={!slot.isOpen}
                  />
                  {slotIndex === 0 && !day.disablePlusButton && (
                    <button type="button" className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleAddSlot(dayIndex)}>+</button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Save
          </button>
          <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;