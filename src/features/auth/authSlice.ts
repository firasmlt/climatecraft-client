import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserCredentials, UserData } from "../../types/auth"
import authService from "./authService"
import { AxiosError } from "axios"

const token = localStorage.getItem("token") || null

interface AuthState {
    token: string | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
}

const initialState: AuthState = {
    token: token ? token : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "fasfdsafdsa",
}

// Async Thunks
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData: UserData, thunkAPI) => {
        try {
            const response = await authService.register(userData)
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: UserCredentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials)
            console.log(response)
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const googleAuthenticateUser = createAsyncThunk(
    "auth/googleAuth",
    async (accessToken: string, thunkAPI) => {
        try {
            const response = await authService.googleAuth(accessToken)
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = authService.logout()
            return true
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.token = action.payload.token
                }
            )
            .addCase(
                registerUser.rejected,
                (state, action: PayloadAction<any>) => {
                    console.log(action)
                    state.isLoading = false
                    state.isError = true
                    state.message =
                        action.payload?.response?.data?.message ||
                        "unexpected error"
                }
            )
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.token = action.payload.token
            })
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false
                    state.isError = true
                    state.message =
                        action.payload?.response?.data?.message ||
                        "unexpected error"
                }
            )
            .addCase(googleAuthenticateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(googleAuthenticateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.token = action.payload.token
            })
            .addCase(
                googleAuthenticateUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false
                    state.isError = true
                    state.message =
                        action.payload?.response?.data?.message ||
                        "unexpected error"
                }
            )
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.token = null
            })
            .addCase(
                logoutUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload.message
                }
            )
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
