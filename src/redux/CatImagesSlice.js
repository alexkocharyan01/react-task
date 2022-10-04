import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  data: [],
  error: '',
  status: false
}

export const CatImageAsync = createAsyncThunk(
  'fetchCatImage',
  async (value, {rejectWithValue}) => {
    try {
      const res = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${value.page}&category_ids=${value.id}`)
      return res.data
    } catch (e) {
        throw rejectWithValue(e.res.data.message);
    }
  }
)


export const CatImageSlice = createSlice({
  name: "catImage",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(CatImageAsync.pending, (state) => {
      state.status = false
    })
    .addCase(CatImageAsync.fulfilled, (state, action) => {
      state.status = true
      state.data = action.payload
    })
    .addCase(CatImageAsync.rejected, (state, action) => {
      state.status = false
      state.error = action.payload
    })
  } 
})

export default CatImageSlice.reducer