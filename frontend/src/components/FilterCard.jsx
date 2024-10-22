import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice'; // Import the action

const filterData = [
  { filterType: "Location", array: ["Delhi", "Noida", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Rajkot"] },
  { filterType: "Industry", array: ["Healthcare", "Engineering", "Information Technology", "Education", "Business and Finance"] },
  {
    filterType: "Salary", 
    array: [
      "< 5 LPA", 
      "< 10 LPA", 
      "< 25 LPA", 
      "< 50 LPA", 
      "< 1 Crore", 
      ">= 1 Crore"
    ]
  },
  { filterType: "Experience", array: ["Experienced", "Entry Level", "3-6 years", "5-7 years", "2-4 years", "5+ years", "1-2 years", "1-3 years", "0-2 years", "1-4 years"] },
  { filterType: "Job Type", array: ["Full-time", "Part-time"] },
  { filterType: "Job Post", array: ["< 1 Days", "< 2 Days", "< 3 Days", "< 4 Days", "< 5 Days", "< 6 Days", "< 7 Days"] },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();


  const changeHandler = (filterType, value, isChecked) => {
    setSelectedFilters(prevFilters => {
      const currentFilter = prevFilters[filterType] || [];
      let updatedFilter;

      if (isChecked) {
        updatedFilter = [...currentFilter, value];
      } else {
        updatedFilter = currentFilter.filter(item => item !== value);
      }

      return {
        ...prevFilters,
        [filterType]: updatedFilter
      };
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className='w-full bg-white shadow-lg rounded-lg p-4'>
      <h1 className='font-bold text-xl text-gray-800 mb-3'>Filter Jobs</h1>
      <hr className='mb-3 border-gray-300' />
      {
        filterData.map((data, index) => (
          <div key={index} className='mb-5'>
            <h2 className='font-semibold text-lg text-gray-700 mb-2'>{data.filterType}</h2>
            <div className='flex flex-col'>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  const isChecked = selectedFilters[data.filterType]?.includes(item) || false;

                  return (
                    <div className='flex items-center space-x-3 my-2' key={itemId}>
                      <input
                        type='checkbox'
                        id={itemId}
                        value={item}
                        checked={isChecked}
                        onChange={(e) => changeHandler(data.filterType, item, e.target.checked)}
                        className='h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                      />
                      <label htmlFor={itemId} className='text-gray-600'>{item}</label>
                    </div>
                  );
                })
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default FilterCard;
