import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allJobs: [], // all jobs data
    searchedQuery: '',
    filters: {
        Location: [],
        salaryRange: [],
    }
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            const { key, value } = action.payload;
            if (key === 'Location') {
                if (state.filters.location.includes(value)) {
                    state.filters.location = state.filters.location.filter(loc => loc !== value);
                } else {
                    state.filters.location.push(value);
                }
            } else if (key === 'salaryRange') {
                state.filters.salaryRange = value;
            }
        },
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        }
    }
});

export const { setFilter, setAllJobs } = jobSlice.actions;

export default jobSlice.reducer;
