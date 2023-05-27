import { createSlice } from '@reduxjs/toolkit'
import { 
    createDish, createDish_fulfilled,
    fetchDishes, fetchDishes_fulfilled, 
    updateDish, updateDish_fulfilled,
    removeDish, removeDish_fulfilled,
} from "./menu.actions";

export const initialState = {
    dishes: []
}

export const MenuDataSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        load: (state, action) => {
            console.log("LOADING");
            state.dishes = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDishes.fulfilled, fetchDishes_fulfilled)
            .addCase(createDish.fulfilled, createDish_fulfilled)
            .addCase(updateDish.fulfilled, updateDish_fulfilled)
            .addCase(removeDish.fulfilled, removeDish_fulfilled)
    }
})

// Action creators are generated for each case reducer function
export const { load } = MenuDataSlice.actions

export default MenuDataSlice.reducer

// SELECTORS
export const selectAllDishes = state => state.menu.dishes