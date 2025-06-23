import { LoggedInPersonnelProps } from 'interfaces/personnel.interface';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isLoading: boolean;
    loggedInPersonnel?: LoggedInPersonnelProps | undefined;
    accessToken?: string;
    refreshToken?: string;
}

export interface SelecterState {
    auth: AuthState;
}

const initialState: AuthState = {
    isLoading: false,
    loggedInPersonnel: undefined,
    accessToken: undefined,
    refreshToken: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { refreshToken, accessToken } = action.payload;
            return {
                ...state,
                refreshToken,
                accessToken
            };
        },
        signoutUser: state => {
            return {
                ...state,
                refreshToken: undefined,
                accessToken: undefined,
                loggedInPersonnel: undefined
            };
        },
        setUser: (state, action) => {
            const {
                role,
                personnelId,
                fullName,
                email,
                personalizationDetails,
                type,
                mobileNumber
            } = action.payload;
            return {
                ...state,
                loggedInPersonnel: {
                    personnelId,
                    fullName,
                    role,
                    email,
                    personalizationDetails,
                    type,
                    mobileNumber
                }
            };
        }
    }
});

export const { setAuth, signoutUser, setUser } = authSlice.actions;

export default authSlice.reducer;
