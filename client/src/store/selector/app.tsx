import { RootState } from "../store"
import { createSelector } from "@reduxjs/toolkit";

const selectAppState = (state: RootState) => state.app;

export const selectUser = createSelector(
    [selectAppState],
    app => app.user
)

export const selectAppIsLoaded = createSelector(
    [selectAppState],
    app => app.loaded,
);

export const selectCalendars = createSelector(
    [selectAppState],
    app => app.calendars,
);

export const selectCoursesOption = createSelector(
    [selectAppState],
    app => app.coursesOption,
);

export const selectSyncRequestStatus = createSelector(
    [selectAppState],
    app => {
        if (app.syncRequest.status !== 'done') {
            return app.syncRequest.status;
        }
        if (!app.syncRequest.detail) { // not supposed to append
            return 'error';
        }
        if (app.syncRequest.detail.error) {
            return 'error';
        }
        if (app.syncRequest.detail.coursesAdded !== null && app.syncRequest.detail.coursesAdded !== null) {
            return 'done';
        }
        return 'loading';
    }
);

export const selectSyncRequest = createSelector(
    [selectAppState],
    app => app.syncRequest.detail,
);
