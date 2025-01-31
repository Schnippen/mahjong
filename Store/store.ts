import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './gameReducer';
import wallReducer from './wallReducer';
import playersReducer from './playersReducer';
import settingsReducer from './settingsReducer';
import riverReducer from './riverReducer';

const store = configureStore({
  reducer: {
    gameReducer: gameReducer,
    wallReducer: wallReducer,
    playersReducer: playersReducer,
    settingsReducer: settingsReducer,
    riverReducer: riverReducer,
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
