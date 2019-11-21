import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface State {

}

export interface AppState {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer

};

export function logger(reducer:ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action ', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
