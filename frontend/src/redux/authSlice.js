// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name:"auth",
//     initialState:{
//         loading:false,
//         user:null
//     },
//     reducers:{
//         // actions
//         setLoading:(state, action) => {
//             state.loading = action.payload;
//         },
//         setUser:(state, action) => {
//             state.user = action.payload;
//         }
//     }
// });
// export const {setLoading, setUser} = authSlice.actions;
// export default authSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist"; // Import REHYDRATE action

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: true, // Set to true initially to show the loading state before rehydration
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state, action) => {
            if (action.payload && action.payload.auth) {
                state.user = action.payload.auth.user || null; // Rehydrate user if present
            }
            state.loading = false; // Set loading to false after rehydration
        });
    },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";
// import { REHYDRATE } from "redux-persist"; // Import REHYDRATE action

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         loading: false,
//         user: null,
//     },
//     reducers: {
//         // actions
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(REHYDRATE, (state, action) => {
//             // When state is rehydrated, set loading to false
//             state.loading = false;
//         });
//     },
// });

// export const { setLoading, setUser } = authSlice.actions;
// export default authSlice.reducer;
