import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/menu/menu.dataSlice'

export default configureStore({
  reducer: {
    menu: menuReducer,
    status: 'idle',
    error: null
  },
})