import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice"

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})