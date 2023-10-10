import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alarmReducer from "@/entities/alarm/alarm-slice";

const rootReducer = combineReducers({
  alarm: alarmReducer,
});

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: rootReducer });
// export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
