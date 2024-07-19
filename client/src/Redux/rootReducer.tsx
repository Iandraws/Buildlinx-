// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import baukastenReducer from './baukastenSlice'; // Import your baukasten reducer here


// Combine all reducers
const rootReducer = combineReducers({
  baukasten: baukastenReducer,
  // Add other reducers here if you have more slices

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
