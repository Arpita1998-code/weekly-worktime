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
  const newSlot = { startTime: '', endTime: '', hourlyRate: '', isOpen: true, isFullDay: false };
  newSchedule[dayIndex].slots.push(newSlot);
  setSchedule(newSchedule);

  const element = document.getElementById(`slot-${dayIndex}-${newSchedule[dayIndex].slots.length - 1}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
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
      <form onSubmit={handleSubmit} className="w-full max-w-md  ">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <h1 className='font-bold absolute top-3 left-[740px]'>From</h1>
          <h1 className='font-bold absolute top-3 left-[830px]'>To</h1>
          <h1 className='font-bold absolute top-3 left-[910px]'>Hourly Rate</h1>
        </div>
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4">
            {day.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="grid grid-cols-5 gap-4 items-center">
                <label className="font-bold w-10 h-10 rounded-full flex items-center justify-center border border-gray-400">{day.day}</label>
                <div>
                  <label htmlFor={`check-${dayIndex}-${slotIndex}`} className="flex bg-gray-300 cursor-pointer relative w-12 h-6 rounded-full">
                    <input type="checkbox" id={`check-${dayIndex}-${slotIndex}`} className='sr-only peer' checked={slot.isOpen} onChange={() => handleToggle(dayIndex, slotIndex, 'isOpen')} />
                    <span className={`w-5 h-5 bg-white absolute rounded-full left-1 top-1 peer-checked:bg-blue-600 peer-checked:left-6 transition-all duration-500 ${slot.isOpen ? 'peer-checked:bg-blue-600 peer-checked:left-6' : ''}`}></span>
                  </label>
                </div>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleChange(dayIndex, slotIndex, 'startTime', e.target.value)}
                  className={`border border-gray-400 px-2 py-1 rounded ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                  disabled={!slot.isOpen}
                />
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleChange(dayIndex, slotIndex, 'endTime', e.target.value)}
                  className={`border border-gray-400 px-2 py-1 rounded ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                  disabled={!slot.isOpen}
                />
                <input
                  type="number"
                  value={slot.hourlyRate}
                  onChange={(e) => handleChange(dayIndex, slotIndex, 'hourlyRate', e.target.value)}
                  className={`border border-gray-400 px-2 py-1 rounded ${!slot.isOpen ? 'bg-gray-200' : ''}`}
                  disabled={!slot.isOpen}
                />
              </div>
            ))}
            {!day.disablePlusButton && (
              <button type="button" className="bg-blue-500 text-white px-2 py-1 relative top-[-35px] left-[460px] rounded" onClick={() => handleAddSlot(dayIndex)}>+</button>
            )}
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
