import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
// createSelector is a memorized function it stores the results of function calls
// and returns the cached result when the same inputs occur again.
export const isLoggedIn = createSelector(
    selectAuthState,

    // old version
    // state => state['auth'],
    (auth) => !!auth.user
);

// createSelector is also a mapping function
export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn

);
