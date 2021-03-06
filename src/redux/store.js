import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const persistor = persistStore(store);

export default store;

//========================
// {
//     "rules": {
//         "contacts": {
//         "$uid": {
//           ".read": "$uid === auth.uid",
//          ".write": "$uid === auth.uid"
//         }
//         },
//         "users": {
//          "$uid": {
//           ".read": "$uid === auth.uid",
//          ".write": "$uid === auth.uid"
//         }
//         },

//     }
// }
//=========
//   {
//     "rules": {
//       ".read": "now < 1614981600000",  // 2021-3-6
//       ".write": "now < 1614981600000",  // 2021-3-6
//     }
//   }
// {
