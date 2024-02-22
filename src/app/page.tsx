"use client";
import React, { useState } from 'react';

const Page = () => {
  const [schedule, setSchedule] = useState([
    { day: 'SUN', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'MON', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'TUE', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'WED', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'THU', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'FRI', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
    { day: 'SAT', startTime: '', endTime: '', hourlyRate: '', isOpen: false, isFullDay: false },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleToggle = (index: number, toggleType: string) => {
    const newSchedule = [...schedule];
    if (toggleType === 'isOpen') {
      newSchedule[index].isOpen = !newSchedule[index].isOpen;
      if (newSchedule[index].isOpen) {
        newSchedule[index].isFullDay = false;
      }
    } else if (toggleType === 'isFullDay') {
      newSchedule[index].isFullDay = !newSchedule[index].isFullDay;
      if (newSchedule[index].isFullDay) {
        newSchedule[index].isOpen = false;
      }
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
          <h1 className='font-bold absolute top-14 left-[500px]'>From</h1>
          <h1 className='font-bold absolute top-14 left-[595px]'>To</h1>
          <h1 className='font-bold absolute top-14 left-[680px]'>Hourly Rate</h1>
        </div>
        {schedule.map((day, index) => (
          <div key={index} className="mb-4 grid grid-cols-5 gap-4 items-center">
            <label className="mb-3 font-bold w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 mr-2">{day.day}</label>
            <div className="col-span-1">
              <label htmlFor='check' className="flex bg-gray-300 cursor-pointer relative w-12 h-6 rounded-full">
                <input type="checkbox" id='check' className='sr-only peer' checked={day.isOpen} onChange={() => handleToggle(index, 'isOpen')} />
                <span className={`w-5 h-5 bg-white absolute rounded-full left-1 top-1 peer-checked:bg-blue-600 peer-checked:left-6 transition-all duration-500 ${day.isOpen ? 'peer-checked:bg-blue-600 peer-checked:left-6' : ''}`}></span>
              </label>
            </div>
            <input
              type="time"
              value={day.startTime}
              onChange={(e) => handleChange(index, 'startTime', e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded col-span-1"
            />
            <input
              type="time"
              value={day.endTime}
              onChange={(e) => handleChange(index, 'endTime', e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded col-span-1"
            />
            <input
              type="number"
              value={day.hourlyRate}
              onChange={(e) => handleChange(index, 'hourlyRate', e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded col-span-1"
            />
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

      <div className="w-full max-w-md ml-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className='font-bold'>Day</th>
              <th className='font-bold'>Start</th>
              <th className='font-bold'>End</th>
              <th className='font-bold'>Rate</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((day, index) => (
              <tr key={index}>
                <td className='font-bold'>{day.day}</td>
                <td>{day.startTime}</td>
                <td>{day.endTime}</td>
                <td>{day.hourlyRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;