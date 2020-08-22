import { createSlice } from '@reduxjs/toolkit';
import { User } from '@prisma/client';
import { Calendar } from 'types';
import coursesOptionDefault from './coursesOption.json';
import { fetchCalendar, fetchCoursesOption, fetchUser, logout } from './thunks';

export interface AppSliceState {
    user?: User,
    loaded: boolean,
    calendars: Record<string, Calendar>,
    coursesOption: string[],
}

const initialState: AppSliceState = {
    loaded: false,
    calendars: {},
    coursesOption: coursesOptionDefault,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCalendar.fulfilled, (state, action) => {
            state.calendars = action.payload.reduce<Record<string, Calendar>>((acc, calendar) => {
                if (!calendar.id) {
                    console.error('Calendar do not have an id', calendar);
                    return acc;
                }
                acc[calendar.id] = calendar;
                return acc;
            }, {});

        });
        builder.addCase(fetchCalendar.rejected, (_, action) => console.error(action.error));

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loaded = true;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            console.error(action.error);
            state.user = undefined;
            state.loaded = true;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.user = undefined;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.user = undefined;
            console.error(action.error);
        });

        builder.addCase(fetchCoursesOption.fulfilled, (state, action) => {
            state.coursesOption = action.payload
        });
        builder.addCase(fetchCoursesOption.rejected, (_, action) => console.error(action.error));
    }
});

// export const {} = appSlice.actions;
