import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDishes, postDish, putDish } from "../../services/api/menu";

const loadDishes = async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getDishes();
        console.log("races:", response);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
export const fetchDishes = createAsyncThunk('menu/dishes/getall', loadDishes)

export const fetchDishes_fulfilled = (state, action) => {
    console.log('fetchDishes action:', action, 'fullfilled payload:', action.payload);
    state.dishes = [...action.payload]
}


export const createDish = createAsyncThunk(
    'menu/dishes/new',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await postDish(_)
            // The response includes the complete post object, including unique ID
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const createDish_fulfilled = (state, action) => {

    // async function a() {
    //     const dishes = await loadDishes();
    //     state.dishes = [...dishes];
    // }

    if (action.payload === true) {
        // a();
        state.dishes = [...state.dishes, action.payload]
    }
}


export const updateDish = createAsyncThunk(
    'menu/dishes/update',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await putDish(_)
            // The response includes the complete post object, including unique ID
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updateDish_fulfilled = (state, action) => {

    // async function a() {
    //     const dishes = await loadDishes();
    //     state.dishes = [...dishes];
    // }

    if (action.payload === true) {
        // a();
        state.dishes = [...state.dishes, action.meta.arg]
    }
}

export const deleteDish = createAsyncThunk(
    'menu/dishes/delete',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await deleteDish(_)
            // The response includes the complete post object, including unique ID
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const deleteDish_fulfilled = (state, action) => {

    // async function a() {
    //     const dishes = await loadDishes();
    //     state.dishes = [...dishes];
    // }

    if (action.payload === true) {
        // a();
        const newDishes = state.dishes.filter(d => d._id !== action.meta.arg)
        state.dishes = [...newDishes]
    }
}