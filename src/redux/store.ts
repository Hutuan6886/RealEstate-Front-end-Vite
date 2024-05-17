import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "@/features/user/userSlice"; //* export toàn bộ @/features/user/userSlice đặt tên là UserReducer

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
