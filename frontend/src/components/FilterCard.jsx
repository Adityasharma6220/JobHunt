import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice'; // Import the action

const filterData = [
  { filterType: "Location", array: ["Delhi", "Noida","Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Rajkot"] },
  { filterType: "Industry", array: ["Healthcare", "Engineering", "Information Technology", "Education", "Business and Finance"] },
  // { filterType: "Role", array: ["Software Development Engineer", "Marketing Manager", "Business", "Quality Assurance Manager", "Sales Executive", "Hospital Administrator"] },
  { filterType: "Salary", array: ["8", "7", "9"] },
  { filterType: "Experience", array: ["Experienced", "Entry Level", "3-6 years", "5-7 years", "2-4 years", "5+ years", "1-2 years", "1-3 years", "0-2 years", "1-4 years"] },
  { filterType: "Job Type", array: ["Full-time", "Part-time"] },
  { filterType: "Job Post", array: ["< 1 Days","< 2 Days","< 3 Days","< 4 Days","< 5 Days","< 6 Days","< 7 Days"] },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  // Function to handle change events for filter checkboxes
  const changeHandler = (filterType, value, isChecked) => {
    setSelectedFilters(prevFilters => {
      const currentFilter = prevFilters[filterType] || []; e
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
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      {
        filterData.map((data, index) => (
          <div key={index} className='mb-4'>
            <h1 className='font-bold text-md mb-2'>{data.filterType}</h1>
            <div>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  const isChecked = selectedFilters[data.filterType]?.includes(item) || false;

                  return (
                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                      <input
                        type='checkbox'
                        id={itemId}
                        value={item}
                        checked={isChecked}
                        onChange={(e) => changeHandler(data.filterType, item, e.target.checked)}
                      />
                      <label htmlFor={itemId}>{item}</label>
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
