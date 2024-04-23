import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import gameReducer from './gameReducer';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    gameReducer:gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

//TODO add typescript to redux
/* // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch */
