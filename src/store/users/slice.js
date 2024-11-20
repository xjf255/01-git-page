import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_USER } from "../../constant";

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER,
  reducers: {
    createNewUser: (state, action) => {
      return { ...action.payload }
    },
    updateStateUser: (state, action) => {
      return Object.assign({ ...state, ...action.payload })
    },
    addRepositories: (state, action) => {
      state.repositories = [
        ...state.repositories,
        ...action.payload.filter(
          newRepo => !state.repositories.some(repo => repo.id === newRepo.id)
        ),
      ]
      state.page += 1
    }
    
  }
})

export default usersSlice.reducer
export const { createNewUser, updateStateUser, addRepositories } = usersSlice.actions