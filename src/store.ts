import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alarmReducer from "@/entities/alarm/alarm-slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const alarmPersistConfig = {
  key: "alarm",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["profiles"],
};

const reducers = combineReducers({
  alarm: persistReducer<ReturnType<typeof alarmReducer>>(
    alarmPersistConfig,
    alarmReducer
  ),
});

// const persistedRootReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
