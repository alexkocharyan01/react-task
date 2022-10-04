import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  data: [],
  error: '',
  status: false
}

export const CategoryAsync = createAsyncThunk(
  'fetchCategories',
  async (value, {rejectWithValue}) => {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/categories")
      return res.data
    } catch (e) {
        throw rejectWithValue(e.res.data.message);
    }
  }
)


export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(CategoryAsync.pending, (state) => {
      state.status = false
    })
    .addCase(CategoryAsync.fulfilled, (state, action) => {
      state.status = true
      state.data = action.payload
    })
    .addCase(CategoryAsync.rejected, (state, action) => {
      state.status = false
      state.error = action.payload
    })
  } 
})

export default CategorySlice.reducer