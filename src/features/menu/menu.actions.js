import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDish, getDishes, postDish, putDish, deleteDish } from "../../services/api/menu";

const loadDishes = async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getDishes();
        console.log("dishes:", response);
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

const loadDish = async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getDish(_);
        console.log("dishes:", response);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
export const fetchDish = createAsyncThunk('menu/dishes/get', loadDish)

export const fetchDish_fulfilled = (state, action) => {
    console.log('fetchDishes action:', action, 'fullfilled payload:', action.payload);
    const updatedMenu = state.dishes.map(dish => {
        if (dish.id === action.payload.id) {
            return action.payload
        } else {
            return dish
        }
    })
    state.dishes = [...updatedMenu]
}

export const createDish = createAsyncThunk(
    'menu/dishes/new',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await postDish(_.dish)
            // The response includes the complete post object, including unique ID
            return response
        } catch (error) {
            return rejectWithValue(error.reason);
        }
    }
)
export const createDish_fulfilled = (state, action) => {
    if (action.payload.success === true)
        state.dishes = [...state.dishes, action.payload.data]
}


export const updateDish = createAsyncThunk(
    'menu/dishes/update',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await putDish(_.dish)
            // The response includes the complete post object, including unique ID
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updateDish_fulfilled = (state, action) => {
    if (action.payload === true) {
        // a();
        state.dishes = [...state.dishes, action.meta.arg]
    }
}

export const removeDish = createAsyncThunk(
    'menu/dishes/delete',
    // The payload creator receives the partial `{title, content, user}` object
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await deleteDish(_)
            // The response includes the complete post object, including unique ID
            return response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const removeDish_fulfilled = (state, action) => {
    if (action.payload === true) {
        const newDishes = state.dishes.filter(d => d.id !== action.meta.arg)
        state.dishes = [...newDishes]
    }
}