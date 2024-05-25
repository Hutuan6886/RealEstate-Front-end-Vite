import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "@/features/user/userSlice"; //* export toàn bộ @/features/user/userSlice đặt tên là UserReducer
import storage from "redux-persist/lib/storage"; //* defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

//todo: Tạo redux-persist để lưu data vào localStorage
const rootReducer = combineReducers({
  //todo: Khai báo toàn bộ reducer của app
  user: UserReducer,
});
const persistConfig = {
  //todo: Key name, version and storage of localStorage
  key: "root",
  storage, //* defaults to localStorage for web
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   //*: Khai báo toàn bộ reducer của app khi không cấu hình redux-persist
  //   user: UserReducer,
  // },
  reducer: persistedReducer, //* reducer khi cấu hình redux-persist
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      // add middleware to fix for error: "A non-serializable value was detected in an action, in the path:...""
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store); //* export persistStore
