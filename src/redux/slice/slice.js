import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await axios.get("/api/portfolio/get-portfolio-data");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const Slice = createSlice({
  name: "portfolio",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true; // Reset error state when pending
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload; // Reset error state when fulfilled
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false; // Set error state when rejected
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default Slice.reducer;
