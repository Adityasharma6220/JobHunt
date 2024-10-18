import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"] },
  { filterType: "Industry", array: ["Healthcare", "Engineering", "Information Technology", "Education", "Business and Finance"] },
  { filterType: "Department", array: ["Production, Manufacturing & Engineering", "Sales & Business Development", "Finance & Accounting"] },
  { filterType: "Experience", array: ["Experienced", "Entry Level"] },
  { filterType: "Nature of Business", array: ["B2B", "B2C", "SaaS", "D2C"] },
  { filterType: "Job Posting Date", array: ["< 7 Days", "< 15 Days"] },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [filterType]: value
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters)); // Dispatch selected filters to Redux
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
                  return (
                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                      <input
                        type='checkbox'
                        id={itemId}
                        value={item}
                        checked={selectedFilters[data.filterType]?.includes(item) || false}
                        onChange={(e) => {
                          const selectedItems = selectedFilters[data.filterType] || [];
                          if (e.target.checked) {
                            changeHandler(data.filterType, [...selectedItems, item]);
                          } else {
                            changeHandler(data.filterType, selectedItems.filter(i => i !== item));
                          }
                        }}
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
